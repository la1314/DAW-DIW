function init() {
  eventoBoton();
}

//Añade un evento click al botton para que lanze la funcion crearCaja
function eventoBoton() {

  let boton = document.querySelector('button');
  boton.addEventListener('click', crearCaja);

  let divGiro = document.getElementById('_giroO');
  divGiro.addEventListener('click', ordenGirar);

  let divRecorrer = document.getElementById('_recorridoV');
  divRecorrer.addEventListener('click', ordenRecorrer);

  let divQuitarOrden = document.getElementById('_quitarOrden');
  divQuitarOrden.addEventListener('click', quitarOrden);

}

//Al contenedor añade una caja la cual tiene un listener que llamará a la función evoluciona cuando esta sea clickada
function crearCaja() {

  revocarOrden();
  let contendor = document.querySelector('container');
  let caja = document.createElement('box');
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
    this.addEventListener('click', apareceCthu, true);

  }

}

//Cuando la caja ha desevolucionado añade al ser de Sedefkar y la capacidad de mostrar su poder
function apareceCthu() {

  if (this.className.includes('desevoluciona')) {
    this.classList.add('ultimate');
    this.classList.add("ultimate:hover");

  }

}

//Funcion que añade un listener a los seres de Sedefkar que los hará girar si con clickados
// y añade al resto de cajas el quitar el listener de girar si estás son clickadas
function ordenGirar() {

  revocarOrden();

  const seres = document.querySelectorAll('.ultimate');
  seres.forEach(element => element.addEventListener('click', girar));

  let cajas = document.querySelectorAll('box:not(.ultimate)');
  cajas.forEach(element => element.addEventListener('click', revocarOrden));
}

function girar() {

  if (this.className.includes('recorrerV')) {
    this.classList.remove('recorrerV');
  }
  this.classList.add('girar');
  revocarOrden();
}

//Funcion que añade un listener a los seres de Sedefkar que los hará recorrer en V si con clickados
// y añade al resto de cajas el quitar el listener de recorrer en V si estás son clickadas
function ordenRecorrer() {
  revocarOrden();

  const seres = document.querySelectorAll('.ultimate');
  seres.forEach(element => element.addEventListener('click', recorrer));

}

function recorrer() {
  if (this.className.includes('girar')) {
    this.classList.remove('girar');
  }
  this.classList.add('recorrerV');
  revocarOrden();
}

//Revoca la orden actual de girar o recorrerV
function revocarOrden() {

  let cajas = document.querySelectorAll('box');
  cajas.forEach(element => element.removeEventListener('click', revocarOrden, false));

  const seres = document.querySelectorAll('.ultimate');
  seres.forEach(element => element.removeEventListener('click', girar, false));
  seres.forEach(element => element.removeEventListener('click', recorrer, false));
  seres.forEach(element => element.removeEventListener('click', quitarClase, false));

}

//Quita la orden actual volviendo al ser de Sedefkar a su estado inicial

function quitarOrden(){

  const seres = document.querySelectorAll('.ultimate');
  seres.forEach(element => element.addEventListener('click', quitarClase));
  let cajas = document.querySelectorAll('box:not(.ultimate)');
  cajas.forEach(element => element.addEventListener('click', revocarOrden));

}

function quitarClase(){

  this.classList.remove('girar');
  this.classList.remove('recorrerV');
  revocarOrden();

}

window.onload = init;
