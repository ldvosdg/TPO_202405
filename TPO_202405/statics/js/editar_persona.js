function modificar() {
    let id = document.getElementById("id").value
    let nombre_ingresado = document.getElementById("nombre").value
    let apellido_ingresado = document.getElementById("apellido").value 
    let correo_ingresado = document.getElementById("correo").value 
    let passwd_ingresado = document.getElementById("passwd").value 
    let telefono_ingresado = document.getElementById("telefono").value
    let genero_ingresado = document.getElementById("genero").value
    let pais_ingresado = document.getElementById("pais").value 
    let nacionalidad_ingresado = document.getElementById("nacionalidad").value 
    let imagen_ingresada = document.getElementById("imagen").value 

    let datos = {
        nombre:nombre_ingresado,
        apellido:apellido_ingresado,
        correo:correo_ingresado,
        passwd:passwd_ingresado,
        telefono:telefono_ingresado,
        genero:genero_ingresado,
        pais:pais_ingresado,
        nacionalidad:nacionalidad_ingresado,
        imagen:imagen_ingresada
    }

    console.log(datos);

    let url = "http://localhost:5000/update/"+id
    var options = {
        body: JSON.stringify(datos),
        method: 'PUT',
        
        headers: { 'Content-Type': 'application/json' },
        // el navegador seguirá automáticamente las redirecciones y
        // devolverá el recurso final al que se ha redirigido.
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")

            //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
           window.location.href = "tabla_personas.html";
          
        })
        .catch(err => {
            this.error = true
            console.error(err);
            alert("Error al Modificar")
        })      
}