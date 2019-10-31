window.onload = function () {

    teclas = document.querySelectorAll('.key');

    teclas.forEach(element => element.addEventListener('transitionend', eliminarTransision, false));

    window.addEventListener("keydown", llamarSonido);

    function llamarSonido(e) {

        const sonido = document.querySelector(`audio[data-key="${e.keyCode}"]`);


        if (!sonido) {
            return;
        }

        sonido.currentTime = 0;
        sonido.play();
        const transicion = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        transicion.classList.add('expansion');
    }

    function eliminarTransision() {

        this.classList.remove('expansion');

    }

}