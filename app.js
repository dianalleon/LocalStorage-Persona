//Registrar Persona

let personas = JSON.parse(localStorage.getItem('persona')) ?? [];
let elimanadas = JSON.parse(localStorage.getItem('eliminada')) ?? [];

mostrarTabla();
mostrarPersonasEliminadas();

//Guardar Persona

var formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const persona = {
        nombre: document.getElementById('nombre').value,
        cedula: document.getElementById('cedula').value,
        fechaNacimiento: document.getElementById('fecha').value
    }

    personas.push(persona);
    persona.edad= calcularEdad(persona.fechaNacimiento);
    mostrarTabla();
    localStorage.setItem('persona', JSON.stringify(personas));
});


function calcularEdad(fechaNacimiento){
    let hoy = new Date();
    var cumpleanos = new Date(fechaNacimiento);
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
            <td>${item.fechaNacimiento}</td>
            <td>${item.edad}</td>
            <td>
                <button type="button" onclick = "eliminarPersona(${item.cedula})">Cancelar</button>
                <button type="button" onclick = "editarPersona(${item.cedula})">Editar</button>
            </td>
      </tr>`
    })
    let tab = document.querySelector("#tab");
    tab.innerHTML = result;
}


//Eliminar una persona del array persona
function eliminarPersona(cedula){

    let result = personas.find(item => item.cedula == cedula);
    elimanadas.push(result)

    localStorage.setItem('eliminada', JSON.stringify(elimanadas));

    let personasfilter = personas.filter((item) => item.cedula != cedula)
    personas = personasfilter

    localStorage.setItem('persona', JSON.stringify(personasfilter))
    mostrarTabla();
    mostrarPersonasEliminadas();

}

function mostrarPersonasEliminadas() {
    let result = "";
    elimanadas.forEach((item) => {
        result += `
        <div id="car2" class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">${item.fechaNacimiento}</p>
            <p class="card-text">${item.edad}</p>
        </div>`
    })
    let car = document.querySelector("#car");
    car.innerHTML = result;
}







