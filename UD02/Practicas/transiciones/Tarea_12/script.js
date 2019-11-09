/*

    ^(;,;)^ : Fragmento perdido

*/

function init() {

  eventoBoton();


}

function eventoBoton() {

  const boton = document.querySelector('button');
  boton.addEventListener('click', crearCaja);

}

function crearCaja() {

  let contendor = document.querySelector('container');
  let caja = document.createElement('box');
  caja.addEventListener('click', evolucionar);

  contendor.appendChild(caja);

}


function evolucionar() {

  if (!this.className.includes('desevoluciona')) {
    this.classList.add('evoluciona');
    this.addEventListener('click', desevolucionar);
  }

}

function desevolucionar(){

  if (this.className.includes('evoluciona')) {
    this.classList.add('desevoluciona');
    this.addEventListener('click', apareceCthu);
  }
}

function apareceCthu(){
  if (this.className.includes('desevoluciona')) {
    this.classList.add('ultimate');
  }
}

function mostrarPoder() {
  
}

window.onload = init;
