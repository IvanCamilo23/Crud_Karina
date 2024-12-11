function consulta_general() {
    let url = "http://127.0.0.1:5000/";
    fetch(url)
        .then(response => response.json())
        .then(data => visualizar(data))
        .catch(error => console.log(error))

    const visualizar = (data) => {
        console.log(data)
        let b = ""
        for (var i = 0; i < data.cliente.length; i++) {
            console.log(i, data.cliente[i].nombre)
            console.log(i, data.cliente[i].correo)
            console.log(i, data.cliente[i].telefono)
            console.log(i, data.cliente[i].direccion)
            b += `<tr><td>${data.cliente[i].id_cliente}</td><td>${data.cliente[i].nombre}</td><td>${data.cliente[i].correo}</td><td>${data.cliente[i].telefono}<td>${data.cliente[i].direccion}</td></td>
            <td><button type='button' class='btn btn-info' onclick="location.href = 'edit.html?variable1=${data.cliente[i].id_cliente}'">Editar</button>
            <button type='button' class='btn btn-danger' onclick="eliminar(${data.cliente[i].id_cliente})">Eliminar</button></td></tr>`
        }
        document.getElementById('data').innerHTML = b
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
    plat=document.getElementById("nombre").value
    usua=document.getElementById("correo").value
    clav=document.getElementById("telefono").value
    dir=document.getElementById("direccion").value
var data = { "nombre": plat,
                "correo":usua,
                "telefono":clav,
                "direccion":dir
};
console.log(data)
fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
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
            .then((data) => visualizar(data))
            .catch((error) => console.log(error))
        const visualizar = (data, id) => {
            console.log(data)
        

        document.getElementById("default").value = data.cliente[0].id_cliente;
        document.getElementById("nombre").value = data.cliente.nombre;
        document.getElementById("correo").value = data.cliente.correo;
        document.getElementById("telefono").value = data.cliente.telefono;
        document.getElementById("direccion").value = data.cliente.direccion;
    }


}
            
function modificar(id) {
    // URL para la actualización
    let url = "http://127.0.0.1:5000/actualizar/" + id;
    
    // Obtener los valores de los campos del formulario
    const plat = document.getElementById("nombre").value;
    const usua = document.getElementById("correo").value;
    const clav = document.getElementById("telefono").value;
    const dir = document.getElementById("direcion").value;

    // Crear un objeto con los datos a enviar
    const data = {
        "nombre": plat,
        "correo": usua,
        "telefono": clav,
        "direccion": dir
    };

    console.log(data);  // Ver los datos que se están enviando
    
    // Hacer la solicitud PUT al servidor
    fetch(url, {
        method: "PUT",  // Método PUT para actualizar
        body: JSON.stringify(data),  // Convertir los datos en formato JSON
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

