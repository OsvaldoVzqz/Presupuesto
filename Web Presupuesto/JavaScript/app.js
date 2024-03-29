const ingresos = [
    new Ingreso('Honorarios', 31000),
    new Ingreso ( 'Auto', 150000)
]

const egresos = [
    new Egreso('Renta', 5000),
    new Egreso('Ropa', 5000)
]

let cargarApp = ()=>{
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}
let cargarCabecero = ()=>{
       
        let presupuesto = totalIngresos() - totalEgresos();
        let porcentajeEgreso = totalEgresos()/totalIngresos();
        document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
        document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
        document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
        document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
    
}

let totalIngresos = ()=>{
    let totalIngresos = 0;

    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos
}

let totalEgresos = ()=>{
    let totalEgresos = 0;

    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos
}

const formatoMoneda = (valor)=>{
   return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2})
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:2})
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}

const crearIngresosHTML=(ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>           
</div>
    `
    return ingresoHTML
}

const eliminarIngreso = (id)=>{
   let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
   ingresos.splice(indiceEliminar, 1);
   cargarCabecero();
    cargarIngresos();
   
}




const cargarEgresos = ()=>{
    let egresosHTML = '';
    for( let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso)
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML
}

const crearEgresosHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor"> - ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `
    return egresoHTML
}

const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1)
    cargarCabecero();
    cargarEgresos();
}


let agregarDato = ()=>{
    console.log('Hola si funciono')
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    console.log(tipo, descripcion, valor);;

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            console.log('soy un ingreso')
            ingresos.push(new Ingreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarIngresos();
        }
    }
}