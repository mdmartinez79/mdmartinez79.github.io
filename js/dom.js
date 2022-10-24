let feriados = document.getElementById("feriados");

let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
  identificadorIntervaloDeTiempo = setInterval(horarios, 3000);
}
let horarios1 = feriados.innerText;
let horarios2 = "Sábado de 10h a 16h";
let horarios3 = "FERIADOS CERRADO";

function horarios() {
    switch (feriados.innerText) {
        case horarios1:
            feriados.innerText = horarios2;
            break;
        case horarios2:
            feriados.innerText = horarios3;
            break;
        case horarios3:
            feriados.innerText = horarios1;
            break;
    }
}

repetirCadaSegundo();

//////////////////////////////

var formulario = document.getElementById("form");
formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    let form = e.target;
    let nombre = form.children[0].children[0].value;
    let correo = form.children[1].children[0].value;
    let asunto = form.children[2].children[0].value;
    let mensaje = form.children[3].children[1].value;
    //Cada vez que se envíe un formulario se va a almacenar en el localStorage
    almacenarForm(nombre, correo, asunto, mensaje); //en archivo database.js
    mostrarFormIngresado(nombre, correo, asunto, mensaje);
    console.log(`CANTIDAD DE FORMULARIOS EN BASE DE DATOS: ${cantFormularios()}`);//en archivo database.js
    succesAlert(`Formulario cargado con éxito!`, `Muchas gracias ${nombre}, en breve nos contactaremos con vos!`, 5000);
}

function mostrarFormIngresado(nombre, correo, asunto, mensaje) {
    console.log(`Datos del formulario ingresado:
    Nombre: ${nombre}
    Correo: ${correo}
    Asunto: ${asunto}
    Mensaje: ${mensaje}`);
}

const mostrarColeccion = async () => {
    try {
        const resp = await fetch('json/productos.json');
        const data = await resp.json();
        pintarColeccion(gestorStock.getNuevosIngresos(data));
    } catch (error) {
       console.log(error); 
    }
    
}

const pintarColeccion = (datos) => {
    const title = 'Producto añadido al carrito!'

    datos.forEach(item => {
        const text = `El producto ${item.marca} ${item.modelo} color ${item.color} fue correctamente añadido al carrito`
        let card = document.createElement("article");
        card.className = "card col-12 col-lg-3";
        card.innerHTML =
        `
        <img src="${item.img}" height="250px" class="card-img-top" id="prod-img">
        <div class="card-body">
            <div class="col-12">
                <button type="button" class="btn btn-warning btn-lang fw-bold lh-1 p-1 h-25 mb-2" id="prod-tipo">${item.tipo}</button>
            </div>
            <h6 class="card-title fw-bold"><span id="prod-brand">${item.marca}</span> <span id="prod-model">${item.modelo}</span></h6>
            <h6 id="prod-color">${item.color}</h6>
            
            <div class="col-12 fw-bold">$ <span id="prod-price">${item.precio}</span></div>
            <button onclick="succesAlert('${title}', '${text}', 4000)"  type="button" class="btn btn-success mt-2 w-100" data-id=${item.id}><i class="fa-solid fa-cart-plus fs-5"></i></button>
        </div>        
        `    
        document.getElementById('coleccion-item').appendChild(card);
    })
}

const mostrarCategorias = async () => {
    try {
        const resp = await fetch('json/productos.json');
        const data = await resp.json();
        pintarCategorias(gestorStock.getTipos(data));
    } catch (error) {
        console.log(error);
    }
    
}

const pintarCategorias = (datos) => {
    datos.forEach(item => {
        let card = document.createElement("article");
        card.className = "col-12 col-lg-2";
        card.innerHTML = 
        `
        <button onclick="mostrarProductos('${item}')" type="button" class="btn btn-dark w-100 pt-3 pb-3">${item}</button>     
        `    
        document.getElementById('categorias-item').appendChild(card);
    })
}

const mostrarProductos = async (tipo) => {
    try {
        const resp = await fetch('json/productos.json');
        const data = await resp.json();
        vaciarHTML("productos-item")
        pintarProductosCat(gestorStock.getProductosTipo(data, tipo))
    } catch (error) {
        console.log(error);
    }
    
}

const vaciarHTML = (idHTML) => {
    const myNode = document.getElementById(idHTML);
    myNode.textContent = '';
}

const pintarProductosCat = (datos) => {
    const title = 'Producto añadido al carrito!'
    datos.forEach(item => {
        const text = `El producto ${item.marca} ${item.modelo} color ${item.color} fue correctamente añadido al carrito`
        let card = document.createElement("article");
        card.className = "card col-12 col-lg-3";
        card.innerHTML = 
        `
        <img src="${item.img}" height="250px" class="card-img-top" id="prod-img">
        <div class="card-body">
            <div class="col-12">
                <button type="button" class="btn btn-warning btn-lang fw-bold lh-1 p-1 h-25 mb-2" id="prod-tipo">${item.tipo}</button>
            </div>
            <h6 class="card-title fw-bold"><span id="prod-brand">${item.marca}</span> <span id="prod-model">${item.modelo}</span></h6>
            <h6 id="prod-color">${item.color}</h6>
            
            <div class="col-12 fw-bold">$ <span id="prod-price">${item.precio}</span></div>
            <button onclick="succesAlert('${title}', '${text}', 4000)"  type="button" class="btn btn-success mt-2 w-100" data-id=${item.id}><i class="fa-solid fa-cart-plus fs-5"></i></button>
        </div>     
        `    
        document.getElementById('productos-item').appendChild(card);
    })
}


function succesAlert(title, text, timer) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: title,
        text: text,
        confirmButtonText: 'Aceptar',
       
        timer: timer
      })
}

function errorAlert(title, text, timer) {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: title,
        text: text,
        confirmButtonText: 'Aceptar',
       
        timer: timer
      })
}