/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

//Muerta el label actual y añade un listener a la barra de progreso siguiente
function mostrarLabel() {

  let datas = document.querySelectorAll('steplabel');

  if (nlabels < datas.length) {

    datas[nlabels].classList.add('estabaEscondido');
    datas[nlabels].addEventListener('transitionend', mostrarProgreso);
    nlabels++;
  }
}

//Muestra la barra de progreso actual y le añade un listener de transitionend
function mostrarProgreso() {

  let progresos = document.querySelectorAll('progress');
  progresos[nprogresos].classList.add('estabaEscondido');
  progresos[nprogresos].value = 100;
  progresos[nprogresos].style.width = "5%";
  progresos[nprogresos].addEventListener('transitionend', sumarProgreso)
  nprogresos++;

}

//Aumenta de 5 en 5 el tramaño de la anchura del proceso hasta llegar a 95%,
// entonces remueve el listener del Label y de la barrara de proceso y entonces llama al la función de mostrar mensaje finals
function sumarProgreso() {

  let anchura = parseInt(this.style.width);
  if (anchura < 95) {
    anchura += 5;
    this.style.width = anchura + '%';

    if (anchura >= 95) {

      let datas = document.querySelectorAll('steplabel');
      datas[nlabels-1].removeEventListener('transitionend', mostrarProgreso);
      this.removeEventListener('transitionend', sumarProgreso);
      let finals = document.querySelectorAll('finalmsg');
      mostrarFinal(finals, nfinals);
      nfinals++;

    }
  }

}

//Muestra el nensaje de completado y añade tambien su animación
// al final llama a la función mostrarLabel para mostrar el siguiente label
function mostrarFinal(final, posicion) {

  final[posicion].classList.add('estabaEscondido');
  final[posicion].classList.add('finalmsgAnimation');

  mostrarLabel();
}

//Elimina el listener del boton y llama a la función mostrarLabel para mostrar el primer elemento label
function startMigration() {

  document.querySelector("button").removeEventListener("click", startMigration);
  mostrarLabel();

}

function init() {

  console.info(" * Init envirnoment ");

  // Set click function on button

  document.querySelector("button").addEventListener("click", startMigration);
}

// Init the environment when all is ready
window.onload = init;
let nlabels = 0;
let nfinals = 0;
let nprogresos = 0;
