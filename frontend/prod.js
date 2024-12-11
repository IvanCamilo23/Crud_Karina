function consulta_general() {
    let url = "http://127.0.0.1:5000/";
    fetch(url)
        .then(response => response.json())
        .then(datae => visualizar(datae))
        .catch(error => console.log(error))

    const visualizar = (datae) => {
        console.log(datae)
        let c = ""
        for (var i = 0; i < datae.productos.length; i++) {
            console.log(i, datae.productos[i].nombre_producto)
            console.log(i, datae.productos[i].descripcion)
            console.log(i, datae.productos[i].precio)
            c += `<tr><td>${datae.productos[i].id_producto}</td><td>${datae.productos[i].nombre_producto}</td><td>${datae.productos[i].descripcion}</td><td>${datae.productos[i].precio}</td>
            <td><button type='button' class='btn btn-info' onclick="location.href = 'edit_prod.html?variable1=${datae.productos[i].id_producto}'">Editar</button>
            <button type='button' class='btn btn-danger' onclick="eliminar(${datae.productos[i].id_producto})">Eliminar</button></td></tr>`
        }
        document.getElementById('datae').innerHTML = c
    }
}



function eliminar(id) {
    let url = "http://127.0.0.1:5000/eliminar/" + id;
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

function registrar(){
    let url = "http://127.0.0.1:5000/registro/";
    nom=document.getElementById("nombre_producto").value
    desc=document.getElementById("descripcion").value
    prec=document.getElementById("precio").value
var datae = { "nombre_producto": nom,
                "descripcion":desc,
                "precio":prec,
};
console.log(datae)
fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(datae), // data can be `string` or {object}!
    headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => visualizar(response));
        const visualizar = (response) => {
        console.log("Success:", response)
        if (response.mensaje == "Error")
            swal("Mensaje", "Error en el registro", "error")
        else
            swal("Mensaje", "Registro agregado exitosamente", "success")
    }
}
    function consulta_individual(id) {
        // alert(id)
        let url = "http://127.0.0.1:5000/consulta_individual/" + id;

        fetch(url)
            .then((response) => response.json())
            .then((datae) => visualizar(datae))
            .catch((error) => console.log(error))
        const visualizar = (datae, id) => {
            console.log(datae)


        document.getElementById("default").value = datae.productos[0].id_cliente;
        document.getElementById("nombre_producto").value = datae.productos.nombre_producto;
        document.getElementById("descripcion").value = datae.productos.descripcion;
        document.getElementById("precio").value = datae.productos.precio;
    }


}

function modificar(id) {
    // URL para la actualización
    let url = "http://127.0.0.1:5000/actualizar/" + id;

    // Obtener los valores de los campos del formulario
    const nom = document.getElementById("nombre_producto").value;
    const desc = document.getElementById("descripcion").value;
    const prec = document.getElementById("precio").value;


    // Crear un objeto con los datos a enviar
    const datae = {
        "nombre_producto": nom,
        "descripcion": desc,
        "precio": prec,

    };

    console.log(datae);  // Ver los datos que se están enviando

    // Hacer la solicitud PUT al servidor
    fetch(url, {
        method: "PUT",  // Método PUT para actualizar
        body: JSON.stringify(datae),  // Convertir los datos en formato JSON
        headers: {
            "Content-Type": "application/json",  // Definir que el contenido es JSON
        },
    })
    .then((res) => res.json())  // Convertir la respuesta a JSON
    .catch((error) => console.error("Error:", error))  // Manejo de errores
    .then((response) => visualizar(response));  // Llamar a la función visualizar con la respuesta
}

// Función para mostrar la respuesta después de la actualización
const visualizar = (response) => {
    console.log("Success:", response);

    // Verificar si la respuesta tiene un mensaje de error
    if (response.mensaje == "Error") {
        swal("Mensaje", "Error en el registro", "error");
    } else {
        swal("Mensaje", "Registro actualizado exitosamente", "success");
    }
};

