function consulta_general_inventarios() {
    let url = "http://127.0.0.1:5000/inventarios";
    fetch(url)
        .then(response => response.json())
        .then(data => visualizar_inventarios(data))
        .catch(error => console.log(error));

    const visualizar_inventarios = (data) => {
        let b = "";
        data.inventarios.forEach(inventario => {
            b += `
                <tr>
                    <td>${inventario.inventario_id}</td>
                    <td>${inventario.producto_id}</td>
                    <td>${inventario.cantidad}</td>
                    <td>${inventario.fecha_ingreso}</td>
                    <td>
                        <button type='button' class='btn btn-info' onclick="location.href = 'edit_inv.html?inventario_id=${inventario.inventario_id}'">Editar</button>
                        <button type='button' class='btn btn-danger' onclick="eliminar_inventario(${inventario.inventario_id})">Eliminar</button>
                    </td>
                </tr>`;
        });
        document.getElementById('data').innerHTML = b;
    };
}

function registrar_inventario() {
    let url = "http://127.0.0.1:5000/inventarios";
    let producto_id = document.getElementById("producto_id").value;
    let cantidad = document.getElementById("cantidad").value;
    let fecha_ingreso = document.getElementById("fecha_ingreso").value;

    let data = {
        "producto_id": producto_id,
        "cantidad": cantidad,
        "fecha_ingreso": fecha_ingreso
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(res => {
            if (res.mensaje === "Error")
                swal("Mensaje", "Error al registrar inventario", "error");
            else
                swal("Mensaje", "Inventario registrado exitosamente", "success")
                    .then(() => window.location.reload());
        })
        .catch(error => console.error("Error:", error));
}

function eliminar_inventario(id) {
    let url = "http://127.0.0.1:5000/eliminar_inventario/" + id;
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
function modificar_inventario(id) {
    let url = `http://127.0.0.1:5000/actualizar_inventario/${id}`;
    let nombre = document.getElementById("producto_id").value;
    let descripcion = document.getElementById("cantidad").value;
    let precio = document.getElementById("fecha_ingreso").value;

    let data = {
        "producto_id": producto_id,
        "cantidad": cantidad,
        "fecha_ingreso": fecha_ingreso
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