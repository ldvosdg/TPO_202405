// Función ejemplo para validar formulario
function validarDatos(){
    // Obtener los valores ingresados por el usuario y .trim() recorta
    // los posibles espacios en blanco al principio y al final.
    let nombre = document.getElementById("firstname").value.trim()
    let apellido = document.getElementById("lastname").value.trim()
    let direccion = document.getElementById("address").value.trim()
    let numero = document.getElementById("number").value.trim()
    let ciudad = document.getElementById("city").value.trim()
    let codigoPostal = document.getElementById("zipcode").value.trim()
    let telefono = document.getElementById("telefono").value.trim()
    let FechaNacimiento = document.getElementById("birthdate").value.trim()
    let mail = document.getElementById("mail").value.trim()
    let clave = document.getElementById("clave").value.trim()
    let error = document.getElementById("campos")

    console.log(typeof(numero));

    // Todo lo que se recibe de document viene en string
    // Verificar si algún campo está en blanco
    if(nombre === "" || apellido === "" || direccion === "" || numero === "" || ciudad === "" ||
       codigoPostal === "" || telefono === "" || FechaNacimiento === "" || mail === "" || clave === ""){
        error.textContent = "Los campos no deben estar vacío, complete por favor😎."
        error.style.color = "red"
        return false
    }

    // Verificar si el nombre, apellido, direccion contiene solo 
    //caracteres alfabéticos 
    //!/^[a-zA-Z]+$/.test(variable)  
    if(!/^[a-zA-Z]+$/.test(nombre)){
        error.textContent = "Ingrese un Nombre válido."
        error.style.color = "blue"
        return false
    }
    if(!/^[a-zA-Z]+$/.test(apellido)){
        error.textContent = "Ingrese un Apellido válido."
        error.style.color = "blue"
        return false
    }

    if(!/^[a-zA-Z]+$/.test(direccion)){
        error.textContent = "Ingrese una Dirección válida."
        error.style.color = "blue"
        return false
    }

    // Verificar si el numero contiene solo 11 dígitos numéricos
    // telefono = "01127729381"
    if(telefone.length !== 11){
        error.textContent = "Ingrese un telefono válido."
        error.style.color = "green"
        return false

    }

    
    // Verificar numero, telefono no es un número
    if(isNaN(numero)){
        error.textContent = "Ingrese sólo números."
        error.style.color = "violet"
        return false
    }
    if(isNaN(telefono)){
        error.textContent = "Ingrese sólo números para Telefono"
        error.style.color = "violet"
        return false
    }
    if(isNaN(codigoPostal)){
        error.textContent = "Ingrese sólo números para Código Postal"
        error.style.color = "violet"
        return false
    }
    
    // Si todas las validaciones son exitosas, informar
    alert("Formulario válido")
    return true
}

    
  