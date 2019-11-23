/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function sumarProgreso() {



  let anchura = parseInt(this.style.width);
  if (anchura < 95) {
    anchura += 5;
    this.style.width = anchura + '%';

    if (anchura >= 95) {
      this.removeEventListener('transitionend', sumarProgreso);
    }
  }


}

function startMigration(){

    let progresos = document.querySelectorAll('progress');
    progresos.forEach( function(element){
      element.value = 100;
      element.style.width = '10%'
      element.addEventListener('transitionend', sumarProgreso)
    });

    // Fragmentos perdidos
    // ^(;,;)^
}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click",startMigration);
}

// Init the environment when all is ready
window.onload=init;
