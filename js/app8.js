function listeners(){
    document.addEventListener("DOMContentLoaded", cargarCursosLocalStorage);
    todosCursos.addEventListener("click", meterCurso)
    carro.addEventListener("click", borrarCurso)
    eliminarCarro.addEventListener("click", () => {
        listaProductos.splice(0)
        alterarCarro(listaProductos)
        sincronizarLocalStorage()
    })
}

let listaProductos = []
const todosCursos = document.querySelector("#lista-cursos")
const eliminarCarro = document.querySelector("#vaciar-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const carro = document.querySelector("#carrito")
listeners()

function meterCurso(elemento){
    elemento.preventDefault(elemento)
    if (elemento.target.classList.contains("agregar-carrito")) {
        const curso = elemento.target.parentElement.parentElement

        const cursoDatos = {
            imagen: curso.querySelector("img").src,
            titulo: curso.querySelector("h4").textContent,
            precio: curso.querySelector(".precio span").textContent,
            id: curso.querySelector("a").getAttribute("data-id"),
            cantidad: 1
        }
    
        const existe = listaProductos.some((curso)=> curso.id === cursoDatos.id )
        if (existe){
            const todosLosCursos = listaProductos.map((curso) => {
                if(curso.id === cursoDatos.id){
                    curso.cantidad++
                    return curso
                } else return curso
            } )
            listaProductos = [...todosLosCursos]
        } else {
            listaProductos = [...listaProductos, cursoDatos]
        }
        alterarCarro(listaProductos)
    }
}

function alterarCarro() {

    while(contenedorCarrito.firstChild){
        contenedorCarrito.firstChild.remove()
    }

    listaProductos.forEach((curso) => {
        const {imagen, titulo, precio, id, cantidad} = curso
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>
        <img src= ${imagen} width="100">
        </td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td>
            <a href="#" class='borrar-curso' data-id="${id}"=></a>
        </td>
        `
        contenedorCarrito.appendChild(row)
    })

    sincronizarLocalStorage()
}

function borrarCurso(elemento){
    if (elemento.target.classList.contains("borrar-curso")) {
        const cursoId = elemento.target.getAttribute("data-id")
        listaProductos = listaProductos.filter((curso) => curso.id !== cursoId)
    }
    alterarCarro(listaProductos)
}

function cargarCursosLocalStorage() {
    listaProductos = JSON.parse(localStorage.getItem("carrito")) || []
    alterarCarro(listaProductos)
}

function sincronizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(listaProductos))
}