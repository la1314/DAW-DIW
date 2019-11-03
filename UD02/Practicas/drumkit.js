window.onload = function() {

  //Mediante querySelectorAll se guarda una NodeList dentro de la variable teclas de todos los elementos que tengan la clase 'key'
  teclas = document.querySelectorAll('.key');

  //Mediante forEach a cada elemento del NodeList se se le añade un EventListener el cual al acabar una transion llamara a la función eliminarTransision()
  teclas.forEach(element => element.addEventListener('transitionend', eliminarTransision, false));

  // Se añade un EventListener a toda la ventana del DOM el cual al ser presionada una tecla llamara a la función llamarSonido
  window.addEventListener('keydown', llamarSonido);

}

//Función encargada de reproducir un sonido cuando un tecla es "pulsada" en la ventana del DOM
function llamarSonido(e) {

  //En una constante se "intenta" guardar el elemento audio cuyo atributo data-key sea igual al evento keyCode que se ha producido, si este elemento no se encuentra en el HTML el siguiente if retornara la función y no hará nada
  // por el contrario si este elemento se encuentra en el HTML se procedera con la secuencia de ejecución del código
  const sonido = document.querySelector(`audio[data-key='${e.keyCode}']`);

  // Se guarda el elemento de clase 'key' cuyo atributo data-key sea igual al evento keyCode que se ha producido
  const transicion = document.querySelector(`.key[data-key='${e.keyCode}']`);

  if (!sonido) {
    return;
  }

  // La posible reproducción actual del elemento se inicializa a 0
  sonido.currentTime = 0;
  // Se procede a reproducir el elemento actual
  sonido.play();

  //Se añade al elemento key la clase expansion
  transicion.classList.add('expansion');
}

//Funcion que elimina la clase 'expansion' del elemento actual
function eliminarTransision() {
  this.classList.remove('expansion');
}
