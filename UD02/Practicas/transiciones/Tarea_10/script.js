const classes = new Array();
classes.push('linear');
classes.push('ease-in');
classes.push('ease-out');
classes.push('ease');
classes.push('ease-in-out');


window.onload = function() {

    let boton = document.querySelector('button');
    limparEventos();
    boton.addEventListener('click', lanzarEvento);

}

function lanzarEvento(){

    cajas = document.getElementsByClassName('caja');
    
    for (let index = 0; index < cajas.length; index++) {
        
        cajas[index].classList.toggle(classes[index]);
        cajas[index].classList.toggle("transicion");
    }

}

function limparEventos(){

    cajas = document.getElementsByClassName('caja');
    
    for (let index = 0; index < cajas.length; index++) {
        
        cajas[index].classList.toggle(classes[index]);
        
    }

}