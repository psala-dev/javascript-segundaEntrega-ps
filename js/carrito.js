//traemos la info del local storage
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

//dom
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {

if(productosEnCarrito && productosEnCarrito.length > 0) {

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach(producto =>{
      
    const div = document.createElement("div");
    div.classList.add("carrito-producto");
        div.innerHTML = `
     <img class="carrito-producto-imagen" src="../${producto.imagen}" alt="${producto.titulo}">
                            <div class="carrito-producto-titulo">
                                <small>titulo</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <p>$${producto.precio * producto.cantidad}</p>
                            </div>
                            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
                    
        `;

        contenedorCarritoProductos.append(div);
    })
} else {

    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}

actualizarBotonesEliminar();
actualizarTotal()
}

cargarProductosCarrito();


// actualiza los botones
function actualizarBotonesEliminar () {
    //los trae del dom
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    //cuando clickeamos llama a la funcion agregar al carrito
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto eliminado.",
        duration: 1800,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderRadius: "2rem",
            
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function(){} // Callback after click
      }).showToast();



    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

Swal.fire({
title: 'estas seguro?',
icon: 'question',
html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
showCancelButton: true,
focusConfirm: false,
confirmButtonText: 'si',
cancelButtonText: 'no'
}).then((result) => {
    if (result.isConfirmed) {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
     }
})

   }


function actualizarTotal() {
    const totalCalculado = 
    productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}
    `;

}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}