function init() {
  eventoBoton();
}

//Añade un evento click al botton para que lanze la funcion crearCaja
function eventoBoton() {

  const boton = document.querySelector('button');
  boton.addEventListener('click', crearCaja);

}

//Al contenedor añade una caja la cual tiene un listener que llamará a la función evoluciona cuando esta sea clickada
function crearCaja() {

  let contendor = document.querySelector('container');
  let caja = document.createElement('box');
  caja.classList.add('latente');
  caja.addEventListener('click', evolucionar);
  contendor.appendChild(caja);

}

//Añade la clase evoluciona cuando no se ha desevolucionado y agrega un nuevo listener listener
function evolucionar() {


  if (!this.className.includes('desevoluciona')) {

    this.classList.add('evoluciona');
    this.addEventListener('click', desevolucionar);

  }

}

//Añade la clase desevoluciona cuando la caja posee la clase evoluciona y añade un listener para mostar al ser de Sedefkar
function desevolucionar() {

  if (this.className.includes('evoluciona')) {
    this.classList.add('desevoluciona');
    this.addEventListener('click', apareceCthu);
  }

}

//Cuando la caja ha desevolucionado añade al ser de Sedefkar y la capacidad de mostrar su poder
function apareceCthu() {

  if (this.className.includes('desevoluciona')) {
    this.classList.add('ultimate');
    this.classList.add("ultimate:hover");

  }
  
}

window.onload = init;
