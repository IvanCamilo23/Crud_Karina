function consulta_general_productos() {
    let url = "http://127.0.0.1:5000/productos"; // Endpoint para obtener productos
    fetch(url)
        .then(response => response.json())
        .then(data => visualizar_productos(data))
        .catch(error => console.log(error));

    const visualizar_productos = (data) => {
        let b = "";
        data.productos.forEach(producto => {
            b += `
                <tr>
                    <td>${producto.id_producto}</td>
                    <td>${producto.nombre_producto}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <button type='button' class='btn btn-info' onclick="location.href = 'edit_prod.html?variable1=${producto.id_producto}'">Editar</button>
                        <button type='button' class='btn btn-danger' onclick="eliminar_producto(${producto.id_producto})">Eliminar</button>
                    </td>
                </tr>`;
        });
        document.getElementById('data').innerHTML = b;
    };
}

function eliminar_producto(id) {
    let url = "http://127.0.0.1:5000/eliminar_producto/" + id;
    fetch(url, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(res => visualizar(res))
        .catch(error => console.error("Error:", error));

    const visualizar = (res) => {
        swal("Mensaje", "Registro " + res.mensaje + " exitosamente", "success")
            .then(() => {
                window.location.reload();
            });
    };
}

function registrar_producto() {
    let url = "http://127.0.0.1:5000/registro_producto/";
    let nombre = document.getElementById("nombre_producto").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = document.getElementById("precio").value;

    let data = {
        "nombre_producto": nombre,
        "descripcion": descripcion,
        "precio": precio
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(res => {
            if (res.mensaje == "Error")
                swal("Mensaje", "Error al registrar producto", "error");
            else
                swal("Mensaje", "Producto registrado exitosamente", "success")
                    .then(() => window.location.reload());
        })
        .catch(error => console.error("Error:", error));
}

function modificar_producto(id) {
    let url = `http://127.0.0.1:5000/actualizar_producto/${id}`;
    let nombre = document.getElementById("nombre_producto").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = document.getElementById("precio").value;

    let data = {
        "nombre_producto": nombre,
        "descripcion": descripcion,
        "precio": precio
    };

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(res => {
            if (res.mensaje == "Error")
                swal("Mensaje", "Error al actualizar producto", "error");
            else
                swal("Mensaje", "Producto actualizado exitosamente", "success")
                    .then(() => window.location.reload());
        })
        .catch(error => console.error("Error:", error));
}
