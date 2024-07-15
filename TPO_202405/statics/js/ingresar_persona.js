function guardar() {
    let nombre_ingresado = document.getElementById("nombre").value //input
    let apellido_ingresado = document.getElementById("apellido").value 
    let correo_ingresado = document.getElementById("correo").value 
    let passwd_ingresado = document.getElementById("passwd").value 
    let telefono_ingresado = document.getElementById("telefono").value 
    let genero_ingresado = document.getElementById("genero").value
    let pais_ingresado = document.getElementById("pais").value 
    let nacionalidad_ingresado = document.getElementById("nacionalidad").value 
    let imagen_ingresada = document.getElementById("imagen").value 
    if(nombre_ingresado === "" || apellido_ingresado === "" || correo_ingresado === "" || 
        passwd_ingresado === "" || telefono_ingresado === "" ||
        genero_ingresado === "" || pais_ingresado === "" || nacionalidad_ingresado === "" ){
            alert("Los campos no deben estar vacío, complete por favor😎.")
         return false
     }
    // Verificar si el nombre, apellido, direccion contiene solo 
    //caracteres alfabéticos 
    //!/^[a-zA-Z]+$/.test(variable)  
    if(!/^[a-zA-Z]+$/.test(nombre_ingresado)){
        alert("Ingrese un Nombre válido, por favor😎.")
           return false
    }
    if(!/^[a-zA-Z]+$/.test(apellido_ingresado)){
        alert("Ingrese un Apellido válido, por favor😎.")
        return false
    }

    // Verificar si el numero contiene solo 11 dígitos numéricos
    // telefono = "01127729381"
    if(telefono_ingresado.length !== 11){
        alert("Ingrese un Teléfono válido, por favor😎.")
        return false

    }

    
    // Verificar numero, telefono no es un número
    if(isNaN(telefono_ingresado)){
        alert("Ingrese sólo números, por favor😎.")
        return false
    }
 
    console.log(nombre_ingresado,apellido_ingresado,correo_ingresado,passwd_ingresado,telefono_ingresado,genero_ingresado,pais_ingresado,nacionalidad_ingresado,imagen_ingresada);
    // Se arma el objeto de js 
    let datos = {
        nombre: nombre_ingresado,
        apellido:apellido_ingresado,
        correo:correo_ingresado,
        passwd:passwd_ingresado,
        telefono: telefono_ingresado,
        genero: genero_ingresado,
        pais:pais_ingresado,
        nacionalidad:nacionalidad_ingresado,
        imagen:imagen_ingresada
    }
    console.log(datos);
    
    let url = "http://localhost:5000/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "tabla_personas.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}