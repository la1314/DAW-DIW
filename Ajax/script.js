function consulta() {

    //let formulario = new FormData(document.getElementsByName('formularioRegistro')[0]);
    let usuario = document.getElementById('nombre').value;

    let url = "https://api.chess.com/pub/player/" + usuario + "/games";

    // Obtener la instancia del objeto XMLHttpRequest
    peticion_http = new XMLHttpRequest();

    // Preparar la función de respuesta
    peticion_http.onreadystatechange = mostrar;

    // Realizar petición HTTP

    peticion_http.open('GET', url);
    //peticion_http.send(formulario);
    peticion_http.send();

    function mostrar() {
        if (peticion_http.readyState == 4 && peticion_http.status == 200) {

            let json = JSON.parse(peticion_http.responseText);
            dibujar(json.games, usuario);

        }
    }
}

function dibujar(json, usuario) {

    let datos = document.getElementById('datos');
    console.log(json);


    json.forEach(element => {

        let div = document.createElement('div');
        let enlace = document.createElement('a');
        let rival = document.createElement('div');
        let divRank = document.createElement('div');
        let label = document.createElement('label');
        let rankeada = document.createElement('input');;
        let movimientos = document.createElement('div');

        div.classList.add('partidas');

        enlace.href = element.url;
        enlace.target = "_blank";
        enlace.innerHTML = "GameID";
        enlace.classList.add('enlaces');

        rival.innerHTML = devolverRival(element, usuario);
        rival.classList.add('rival');

        label.innerHTML = "Rankeada";
        rankeada.type = "checkbox";
        rankeada.checked = element.rated;


        divRank.appendChild(label);
        divRank.appendChild(rankeada);

        movimientos.innerHTML = element.pgn;

        div.appendChild(enlace);
        div.appendChild(rival);
        div.appendChild(divRank);
        div.appendChild(movimientos);

        datos.appendChild(div);
    });
}

function devolverRival(elemento, usuario) {

    let nombre;
    let separacion;

    if (!elemento.white.includes(usuario)) {
        
        separacion = elemento.white.split('/');
        nombre = separacion[separacion.length-1];
    }


    if (!elemento.black.includes(usuario)) {
        separacion = elemento.black.split('/');
        nombre = separacion[separacion.length-1];
    }

    return nombre;
}

function init() {

    let boton = document.getElementById('consulta');
    boton.addEventListener('click', consulta);
    boton.click();
}

window.onload = init;