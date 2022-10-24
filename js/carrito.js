let carrito = {}
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const listadoCarrito = document.getElementById('listado-carrito').content
const detalleFooter = document.getElementById('detalle-footer').content
const fragment = document.createDocumentFragment()

// ver de guardar las cosas en el local storage para llevarmelo a la pagina del carrito
// o sino implementar el carrito en un modal en el index

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

productos.addEventListener('click', e => {
    addCarrito(e)
})
coleccion.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const addCarrito = e => {
    
    if(e.target.classList.contains('btn-success')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = prod => {
    const producto = {
        id: prod.querySelector('.btn-success').dataset.id,
        brand: prod.querySelector('#prod-brand').textContent,
        model: prod.querySelector('#prod-model').textContent,
        color: prod.querySelector('#prod-color').textContent,
        price: prod.querySelector('#prod-price').textContent,
        quantity: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.quantity = carrito[producto.id].quantity + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()    
}

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(prod => {
        listadoCarrito.querySelector('th').textContent = prod.id
        listadoCarrito.querySelectorAll('td')[0].textContent = prod.brand + " " + prod.model
        listadoCarrito.querySelectorAll('td')[1].textContent = prod.color
        listadoCarrito.querySelectorAll('td')[3].textContent = prod.quantity
        listadoCarrito.querySelector('.btn-info').dataset.id = prod.id
        listadoCarrito.querySelector('.btn-danger').dataset.id = prod.id
        listadoCarrito.querySelector('span').textContent = prod.price * prod.quantity

        const clone = listadoCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acum, {quantity}) => acum + quantity, 0)
    const nPrecio = Object.values(carrito).reduce((acum, {quantity, price}) => acum + (quantity * price), 0)
    
    detalleFooter.querySelectorAll('td')[0].textContent = nCantidad
    detalleFooter.querySelector('span').textContent = nPrecio

    const clone = detalleFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e => {
    // acción de aumentar cantidad
    if(e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.quantity++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    // accion de disminuir
    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.quantity--
        if (producto.quantity === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }

    e.stopPropagation()
}







const validarCompra = () => {
    const nombreCarrito = document.getElementById('nombreCompra').content
    const mailCarrito = document.getElementById('emailCompra').content
    if (!nombreCarrito || !mailCarrito)
    {
        succesAlert("Por favor, completá los datos nombre y correo electrónico para poder realizar pago y envío !");

    }else{
    if (!esObjetoVacio(JSON.parse(localStorage.getItem('carrito'))) ) {                
        succesAlert("Compra reservada con éxito!",
         "En breve te llegará un correo para que completes tus datos de pago y envío", 5000)  
        carrito = {}
        pintarCarrito()
    } else {
        errorAlert("Compra rechazada!", "No hay artículos en el carrito", 4000)
    }
    }
}

const esObjetoVacio = obj => {
    return Object.keys(obj).length === 0
}