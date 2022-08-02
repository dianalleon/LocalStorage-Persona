//Registrar Persona
let personas = JSON.parse(localStorage.getItem('persona')) ?? [];
let eliminadas = JSON.parse(localStorage.getItem('eliminada')) ?? [];

mostrarTabla();
mostrarPersonasEliminadas();

//Ocultar boton de edición(boton inhabilitado)
let editar = document.getElementById('editar')
editar.style.display = "none"


//Guardar Persona

var formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const persona = {
        nombre: document.getElementById('nombre').value,
        cedula: document.getElementById('cedula').value,
        fecha: document.getElementById('fecha').value
    }

    personas.push(persona);
    persona.edad= calcularEdad(persona.fecha);
    mostrarTabla();
    localStorage.setItem('persona', JSON.stringify(personas));
});


function calcularEdad(fecha){
    let hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

function mostrarTabla(){
    let result = "";
    personas.forEach((item) => {
        result += `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.cedula}</td>
            <td>${item.fecha}</td>
            <td>${item.edad}</td>
            <td>
                <button type="button" onclick = "eliminarPersona(${item.cedula})">Cancelar</button>
                <button type="button" onclick = "mostrarDatosEditar(${item.cedula})">Editar</button>
            </td>
      </tr>`
    })
    let tab = document.querySelector("#tab");
    tab.innerHTML = result;
}


//Eliminar una persona del array persona
function eliminarPersona(cedula){

    let validar = window.confirm('Deseas Eliminar');
    if (validar === true) {
        window.alert('Aceptar');
    } else { 
        window.alert('Rechazar');
    }

    let result = personas.find(item => item.cedula == cedula);
    eliminadas.push(result)

    localStorage.setItem('eliminada', JSON.stringify(eliminadas));

    let personasfilter = personas.filter((item) => item.cedula != cedula)
    personas = personasfilter

    localStorage.setItem('persona', JSON.stringify(personasfilter))
    mostrarTabla();
    mostrarPersonasEliminadas();

}

function mostrarPersonasEliminadas() {
    let result = "";
    eliminadas.forEach((item) => {
        result += `
        <div id="car2" class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">${item.fecha}</p>
            <p class="card-text">${item.edad}</p>
        </div>`
    })
    let car = document.querySelector("#car");
    car.innerHTML = result;
}


function mostrarDatosEditar(cedula){

    let guardar = document.getElementById('guardar')
    guardar.style.display = "none"

    editar.style.display = "block"

    let validar = window.confirm('Deseas Editar');
    if (validar === true) {
        window.alert('Aceptar');
    } else { 
        window.alert('Rechazar');
    }

    let result = personas.find(item => item.cedula==cedula);

    let nombre = document.getElementById('nombre')
    let cedula2 = document.getElementById('cedula')
    let fecha = document.getElementById('fecha')

    nombre.setAttribute("value", result.nombre)
    cedula2.setAttribute("value", result.cedula)
    fecha.setAttribute("value", result.fecha)

    editarPersona(result.cedula)
}

//Editar Persona
function editarPersona(){
        editar.addEventListener('submit', function(e){
        e.preventDefault();

        const materia2 = {
            nombre: document.getElementById('nombre').value,
            cedula: document.getElementById('cedula').value,
            fecha: document.getElementById('fecha').value
        }   
        });  
}










