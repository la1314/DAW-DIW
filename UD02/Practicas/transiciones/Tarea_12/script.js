/* 
 
    ^(;,;)^ : Fragmento perdido

*/

function init(){
    
    eventoBoton();

}

function eventoBoton(){

    const boton = document.querySelector('button');
    boton.addEventListener('click', crearCaja);

}

function crearCaja(){
    
    let contendor = document.querySelector('container');
    let caja = document.createElement('box');
    contendor.appendChild(caja);

}


window.onload=init;
