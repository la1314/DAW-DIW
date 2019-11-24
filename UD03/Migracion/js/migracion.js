/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

//Muerta el elemento actual y añade un listener a la barra de progreso que le precede
function mostrarLabel() {

  let datas = document.querySelectorAll('*[data-step]');

  if (elementoActual < dataSteps) {

    datas[elementoActual].classList.add('estabaEscondido');
    datas[elementoActual].addEventListener('transitionend', mostrarProgreso);

  }
}

//Muestra la barra de progreso actual y le añade un listener de transitionend
function mostrarProgreso() {

  elementoActual++;
  let datas = document.querySelectorAll('*[data-step]');
  datas[elementoActual].classList.add('estabaEscondido');
  datas[elementoActual].value = 100;
  datas[elementoActual].style.width = "5%";
  datas[elementoActual].addEventListener('transitionend', sumarProgreso)

}

//Aumenta de 5 en 5 el tramaño de la anchura del proceso hasta llegar a 95%,
// entonces remueve el listener del elemento y de la barrara de proceso y entonces llama al la función de mostrar mensaje finals
function sumarProgreso() {

  let anchura = parseInt(this.style.width);
  if (anchura < 95) {
    anchura += 5;
    this.style.width = anchura + '%';

    if (anchura >= 95) {

      elementoActual++;
      let datas = document.querySelectorAll('*[data-step]');
      datas[elementoActual].removeEventListener('transitionend', mostrarProgreso);
      this.removeEventListener('transitionend', sumarProgreso);
      mostrarFinal(datas, elementoActual);
    }
  }

}

//Muestra el nensaje de completado y añade tambien su animación
// al final llama a la función mostrarLabel para mostrar el siguiente elemento
function mostrarFinal(final, posicion) {

  final[posicion].classList.add('estabaEscondido');
  final[posicion].classList.add('finalmsgAnimation');
  elementoActual++;
  mostrarLabel();
}

//Elimina el listener del boton y llama a la función mostrarLabel para mostrar el primer elemento
function startMigration() {

  document.querySelector("button").removeEventListener("click", startMigration);

  let datas = document.querySelectorAll('*[data-step]');
  dataSteps = datas[datas.length-1].getAttribute('data-step');

  mostrarLabel();

}


function init() {

  console.info(" * Init envirnoment ");

  // Set click function on button

  document.querySelector("button").addEventListener("click", startMigration);
}

// Init the environment when all is ready
window.onload = init;

let elementoActual = 0;
let dataSteps = 0;
