function obtenerCarrito() 
{   //--- Obtengo el carrito del localStorage ---//
    let carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito();
    if (carrito.length === 0) {
        //--- Si el carrito no tiene elementos directamente termino la funcion ---//
        return;
    }
    carrito.forEach(producto => {
        //--- Por cada producto agrego a la tabla los valores correspondientes de cada producto ---//
        tabla.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio}</td>
            </tr>
        `;
    });
    //--- Utilizo un reduce con un acumulador para obtener el precio final de los productos en el carrito teniendo en cuenta sus cantidades ---//
    let total = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    let h2 = document.getElementById("valor-final");
    h2.textContent = `El valor final a pagar es de: $${total}`;
}

function limpiarCarrito() 
{   //--- Remuevo el carrito del localStorage y reasigno la tabla y el valor final a sus estados originales ---//
    localStorage.removeItem("carrito");
    document.getElementById("tabla-carrito").innerHTML = `<tr class="fila-header-carrito">
                    <td class="celda-header-tabla-carrito">Nombre del producto</td>
                    <td class="celda-header-tabla-carrito">Cantidad</td>
                    <td class="celda-header-tabla-carrito">Precio unitario</td>
                </tr>`;
    document.getElementById("valor-final").textContent = "El valor final a pagar es de: $0";
    alert("Carrito limpiado correctamente");
}



// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});