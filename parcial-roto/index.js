//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{    
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    return carrito ? carrito : [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    carrito.forEach(producto => {
        console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`);
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    //--- Obtengo el contenedor padre del boton ---//
    let lipadre = elementoClickeado.parentElement;
    let nombreProducto = lipadre.querySelector(".nombre-producto").textContent;
    let textoProducto = lipadre.querySelector(".precio-producto").textContent.replace("$", "");
    let precioProducto = parseFloat(textoProducto);
    let carrito = obtenerCarrito();
    if(carrito.length === 0) {
        //--- Si el carrito no tiene elementos directamente pusheo el producto al carrito y finalizo con la funcion ---//
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
        alert(`Has agregado una unidad de ${nombreProducto} al carrito`);
        guardarCarrito(carrito);
        return;
    }
    //--- Busco si el producto ya existe en el carrito ---//
    let productoEnCarrito = carrito.find(producto => producto.nombre === nombreProducto);
    if (productoEnCarrito) {
        //--- Si el producto ya existe, incremento su cantidad ---//
        productoEnCarrito.cantidad++;
    } else {
        //--- Si el producto no existe, lo agrego al carrito con cantidad 1 ---//
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
    }
    alert(`Has agregado una unidad de ${nombreProducto} al carrito`);
    guardarCarrito(carrito);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    //--- Obtengo el contenedor padre del boton ---//
    let lipadre = elementoClickeado.parentElement;
    let nombreProducto = lipadre.querySelector(".nombre-producto").textContent;
    let carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("No hay ningun producto guardado en el carrito");
        return;
    }
    //--- Busco si el producto ya existe en el carrito ---//
    let productoEnCarrito = carrito.find(producto => producto.nombre === nombreProducto);
    if (productoEnCarrito) {
        //--- Si el producto ya existe, decremento su cantidad ---//
        productoEnCarrito.cantidad--;
        alert(`Has restado una unidad de ${nombreProducto}.`);
        //--- Si la cantidad es 0 o menos, lo elimino del carrito ---//
        if (productoEnCarrito.cantidad <= 0) {
            carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
        }
        guardarCarrito(carrito);
    } else {
        alert(`No hay mas ${nombreProducto} en el carrito`);
    }
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
