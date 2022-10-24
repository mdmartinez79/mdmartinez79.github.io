class Formulario {
    constructor(nombrePersona, email, asunto, mensaje) {
        this.nombre = nombrePersona;
        this.email = email;
        this.asunto = asunto;
        this.mensaje = mensaje;
    }
}

 function almacenarForm(nombre, correo, asunto, mensaje) {    
    crearBaseFormSiNoHay(); // creo una nueva base de datos de formularios si no existiese en el localStorage
    const newForm = new Formulario(nombre, correo, asunto, mensaje);
    const baseDatos = JSON.parse(localStorage.getItem(`Formularios`)); //solicito el array de fomrularios alojado en el localStorage
    baseDatos.push(newForm); //agrego el nuevo formulario    
    localStorage.setItem(`Formularios`, JSON.stringify(baseDatos)); //actualizo la base de datos de formularios en el localStorage
}

function crearBaseFormSiNoHay() {
    !localStorage.getItem(`Formularios`) && localStorage.setItem(`Formularios`, JSON.stringify([]));
}

const cantFormularios = () => {
    return JSON.parse(localStorage.getItem(`Formularios`)).length;
}

const gestorStock = {

    getNuevosIngresos: function(data) {
        let deCadaTipo = [];        
        data.forEach(stock => {
            let {productos} = stock;
            deCadaTipo.push(productos[0]);
        });       
        return deCadaTipo;        
    },

    getTipos: function(data) {
        let tipos = [];        
        data.forEach(stock => {
            tipos.push(stock.tipo);
        });       
        return tipos;        
    },

    getProductosTipo: function(data, tipo) {
        let _tipo = data.find(e => e.tipo === tipo)
        return _tipo.productos
    }
}