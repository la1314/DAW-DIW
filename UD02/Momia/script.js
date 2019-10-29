let classPasillo = "pasillo";
let classBorde = "borde";
let classPersonaje = "personaje";
let classPuerta = "puerta";
let classMomia = "momia";
let classPisado = "sueloPisado";
let classOculto = "oculto";
let classDescubierto = "descubierto";
let classUrna = "urna";
let classLlave = "llave";
let classSarcofago = "sarcofago";
let classPergamino = "pergamino";
let classMamadisimo = "mamadisimo";
let vectorPosicionMomia = new Array();
let vectorObjetos = new Array();
let vectorMomias = new Array();
var numeroMomias = 1;
var numeroVidas = 4;
var fila = 16;
var col = 23;
var puntuacion = 0;

window.onload = function() {

  /*Se requieren de 16 filas y 23 columnas
   */
  crearMapa(fila, col);

  //this.setInterval('funcion()', 1000)
  this.setInterval('iaMomia()', 800);

  document.addEventListener("keydown", devolverValorKey, false);

  function devolverValorKey(e) {

    let keyCode = e.key;

    if (keyCode == "ArrowUp") {

      moverse(1);

    } else if (keyCode == "ArrowDown") {

      moverse(2);

    } else if (keyCode == "ArrowLeft") {

      moverse(3);

    } else if (keyCode == "ArrowRight") {

      moverse(4);

    }
  }
}

function crearMapa(fila, col) {

  let contenedor = document.getElementById("_contenedor");

  while (contenedor.firstChild) {

    contenedor.removeChild(contenedor.firstChild)

  }

  for (let f = 0; f < fila; f++) {
    for (let c = 0; c < col; c++) {
      if (f == 1 && c == 11) {

        addNodos(f, c, classPersonaje);

      } else {
        if (c == 0 || f == 0 || c == col - 1 || f == fila - 1 || f == 1) {
          addNodos(f, c, classBorde);
        } else {
          addNodos(f, c, classPasillo);
        }
      }
    }
  }

  agregarPaneles();

  vectorObjetos = agregarRectangulos(4, 5, vectorObjetos);
  generarObjetos(vectorObjetos);

  for (var i = 0; i < numeroMomias; i++) {
    agregarMomia();
  }

}

/*
 * Crea y añade div al contenedor asignandole a cada uno una ID única
 * las cuales están representadas en las posiciones de una matriz
 */
function addNodos(fila, col, clase) {

  var nodo = document.createElement("div");
  nodo.id = fila + "-" + col;

  //Ver posición de cada celda
  //nodo.innerText = fila + "-" + col;

  nodo.classList.add(clase);
  document.getElementById("_contenedor").appendChild(nodo);
}

/*
 * Dado el mapa actual del juego pasamos el numero de objetos que habŕan por fila y columnas
 * y devolvera un vector con las posiciones donde han de estar estos objetos
 */
function agregarRectangulos(filas, columnas, vector) {

  let inicioF = 4;
  let inicioC = 3;
  let index = 0;

  for (let fil = 0; fil < filas; fil++) {
    for (let col = 0; col < columnas; col++) {

      vector[index] = inicioF + "-" + inicioC;
      inicioC += 4;
      index++;
    }

    inicioC = 3;
    inicioF += 3;
  }

  return vector;
}

/*Genera los objetos con los que interactua el personaje, através de un vector que contiene
 * las posiciones donde pueden aparecer dichos objetos
 */
function generarObjetos(vector) {

  let iterandos = vector.length;

  for (let index = 0; index < iterandos; index++) {

    let clase = "vacio";

    if (index == 0) {
      clase = classLlave;
    } else if (index == 1) {
      clase = classSarcofago;
    } else if (index == 2) {
      clase = classPergamino;
    } else if (index == 3) {
      clase = classUrna;
    }

    let indexRandom = Math.floor(Math.random() * vector.length);
    let valor = vector[indexRandom].split("-");
    propagarRectangulo(parseInt(valor[0]), parseInt(valor[1]), clase, classPasillo, classOculto);
    vector = removerItem(vector, vector[indexRandom]);
  }

}

/*
 * Mediante una coordenada elimina una clase y añade otra clase a los lados y encima del punto inicial
 */
function propagarRectangulo(fil, col, clase, claseRetirar, ocultar) {

  let centro = fil + "-" + col;
  let arriba = (fil - 1) + "-" + col;
  let izquierda = fil + "-" + (col - 1);
  let derecha = fil + "-" + (col + 1);
  let norOeste = (fil - 1) + "-" + (col - 1);
  let norEste = (fil - 1) + "-" + (col + 1);

  //Retira la clase anterior
  document.getElementById(centro).classList.remove(claseRetirar);
  document.getElementById(izquierda).classList.remove(claseRetirar);
  document.getElementById(norOeste).classList.remove(claseRetirar);
  document.getElementById(arriba).classList.remove(claseRetirar);
  document.getElementById(norEste).classList.remove(claseRetirar);
  document.getElementById(derecha).classList.remove(claseRetirar);

  //Añade las nuevas clases
  document.getElementById(centro).classList.add(clase, ocultar, centro);
  document.getElementById(izquierda).classList.add(clase, ocultar, centro);
  document.getElementById(norOeste).classList.add(clase, ocultar, centro);
  document.getElementById(arriba).classList.add(clase, ocultar, centro);
  document.getElementById(norEste).classList.add(clase, ocultar, centro);
  document.getElementById(derecha).classList.add(clase, ocultar, centro);

}

//Función utilizada para descubrir si lo que rodea al objeto es suelo pisado
function descubrirPisado(posicion) {

  let fil = parseInt(posicion.split("-")[0]);
  let col = parseInt(posicion.split("-")[1]);

  let abajo = (fil + 1) + "-" + col;
  let abajoDer = (fil + 1) + "-" + (col + 1);
  let abajoIzq = (fil + 1) + "-" + (col - 1);

  let arriba = (fil - 2) + "-" + col;
  let arribaDer = (fil - 2) + "-" + (col + 1);
  let arribaIzq = (fil - 2) + "-" + (col - 1);

  let izquierda = fil + "-" + (col - 2);
  let izquierdaArriba = (fil - 1) + "-" + (col - 2);
  let derecha = fil + "-" + (col + 2);
  let derechaAbajo = (fil - 1) + "-" + (col + 2);

  let norOeste = (fil - 2) + "-" + (col - 2);
  let norEste = (fil - 2) + "-" + (col + 2);
  let surOeste = (fil + 1) + "-" + (col - 2);
  let surEste = (fil + 1) + "-" + (col + 2);

  if (
    (document.getElementById(abajo).className == classPisado || document.getElementById(abajo).className.includes(classPersonaje)) &&
    (document.getElementById(abajoDer).className == classPisado || document.getElementById(abajoDer).className.includes(classPersonaje)) &&
    (document.getElementById(abajoIzq).className == classPisado || document.getElementById(abajoIzq).className.includes(classPersonaje)) &&
    (document.getElementById(arriba).className == classPisado || document.getElementById(arriba).className.includes(classPersonaje)) &&
    (document.getElementById(arribaDer).className == classPisado || document.getElementById(arribaDer).className.includes(classPersonaje)) &&
    (document.getElementById(arribaIzq).className == classPisado || document.getElementById(arribaIzq).className.includes(classPersonaje)) &&
    (document.getElementById(izquierda).className == classPisado || document.getElementById(izquierda).className.includes(classPersonaje)) &&
    (document.getElementById(izquierdaArriba).className == classPisado || document.getElementById(izquierdaArriba).className.includes(classPersonaje)) &&
    (document.getElementById(derecha).className == classPisado || document.getElementById(derecha).className.includes(classPersonaje)) &&
    (document.getElementById(derechaAbajo).className == classPisado || document.getElementById(derechaAbajo).className.includes(classPersonaje)) &&
    (document.getElementById(norOeste).className == classPisado || document.getElementById(norOeste).className.includes(classPersonaje)) &&
    (document.getElementById(norEste).className == classPisado || document.getElementById(norEste).className.includes(classPersonaje)) &&
    (document.getElementById(surOeste).className == classPisado || document.getElementById(surOeste).className.includes(classPersonaje)) &&
    (document.getElementById(surEste).className == classPisado || document.getElementById(surEste).className.includes(classPersonaje))
  ) {
    retirarOculto(fil, col, classOculto, classDescubierto);
  }

}

function retirarOculto(fil, col, claseRetirar, claseDescubierta) {

  let centro = fil + "-" + col;
  let arriba = (fil - 1) + "-" + col;
  let izquierda = fil + "-" + (col - 1);
  let derecha = fil + "-" + (col + 1);
  let norOeste = (fil - 1) + "-" + (col - 1);
  let norEste = (fil - 1) + "-" + (col + 1);

  //Retira la clase anterior
  document.getElementById(centro).classList.remove(claseRetirar);
  document.getElementById(izquierda).classList.remove(claseRetirar);
  document.getElementById(norOeste).classList.remove(claseRetirar);
  document.getElementById(arriba).classList.remove(claseRetirar);
  document.getElementById(norEste).classList.remove(claseRetirar);
  document.getElementById(derecha).classList.remove(claseRetirar);

  document.getElementById(centro).classList.add(claseDescubierta);
  document.getElementById(izquierda).classList.add(claseDescubierta);
  document.getElementById(norOeste).classList.add(claseDescubierta);
  document.getElementById(arriba).classList.add(claseDescubierta);
  document.getElementById(norEste).classList.add(claseDescubierta);
  document.getElementById(derecha).classList.add(claseDescubierta);

  puntuacion+=10;
  //Cuando se descubre pergamino llama a las funciones necesarias para poner mamadisimo al personaje
  if (document.getElementById(centro).className.includes(classPergamino)) {
    let id = document.getElementsByClassName(classPersonaje)[0].id;
    let personaje = document.getElementById(id);
    comprobarPergamino(personaje);
    puntuacion+=10;
  }

  //Cuando se descubre el sarcofago se libera una nueva momia
  if (document.getElementById(centro).className.includes(classSarcofago)) {
    comprobarSarcofago();
  }

  comprobarPuerta();
  actualizarPuntuacion();
}

function descubrirObjeto(posicion) {

  let fil = parseInt(posicion.split("-")[0]);
  let col = parseInt(posicion.split("-")[1]);

  let nordEste = (fil - 1) + "-" + (col - 1);
  let nordOeste = (fil - 1) + "-" + (col + 1);
  let surEste = (fil + 1) + "-" + (col - 1);
  let surOeste = (fil + 1) + "-" + (col + 1);

  if (document.getElementById(nordEste).className.includes(classOculto)) {
    descubrirPisado(document.getElementById(nordEste).classList[2]);
  }

  if (document.getElementById(nordOeste).className.includes(classOculto)) {
    descubrirPisado(document.getElementById(nordOeste).classList[2]);
  }

  if (document.getElementById(surEste).className.includes(classOculto)) {
    descubrirPisado(document.getElementById(surEste).classList[2]);
  }

  if (document.getElementById(surOeste).className.includes(classOculto)) {
    descubrirPisado(document.getElementById(surOeste).classList[2]);
  }
}

// Elimina un elemento de un arrray
function removerItem(vector, item) {
  return vector.filter(function(e) {
    return e !== item;
  });
};

//Mediante un entero se determina hacia que direccion se va a molet momia = document.createElement("div");ver el personaje
/*
    Arriba: 1
    Abajo: 2
    Izquierda: 3
    Derecha: 4
 */
function moverse(direccion) {

  if (document.getElementsByClassName(classPersonaje).length > 0) {

    let elemento = document.getElementsByClassName(classPersonaje);
    let posicion = elemento[0].id;
    let separar = elemento[0].id.split("-");

    let fila = parseInt(separar[0]);
    let col = parseInt(separar[1]);

    if (direccion == 1) {
      fila--;
    } else if (direccion == 2) {
      fila++;
    } else if (direccion == 3) {
      col--;
    } else if (direccion == 4) {
      col++;
    }

    let identificador = fila + "-" + col;
    comprobarMovimiento(posicion, identificador);
  }

}

//Comprueba mediante las posiciones pasadas que el idDestino posea alguna de las dos clases para poder realizar el intercambio de clases (moverse).
function comprobarMovimiento(idPJ, idDestino) {
  if (document.getElementById(idDestino).className == classPasillo || document.getElementById(idDestino).className == classPisado) {

    intercambiarClases(idPJ, idDestino);
    descubrirObjeto(idDestino);
  }

  if (document.getElementById(idDestino).className == classPuerta) {

    recargar();
  }

}

//Función que cambia la clase del personaje con el div destino
function intercambiarClases(idPj, idDestino) {

  // Obtiene los atributos mediante las IDs pasadas por parámetro y el nombre de la clase del atributo a cambiar
  let divPersonaje = document.getElementById(idPj);
  let divPasillo = document.getElementById(idDestino);
  let divPasilloClase = divPasillo.className;
  divPersonaje.classList.remove(classPersonaje);
  divPasillo.classList.remove(divPasilloClase);

  if (divPasilloClase == classPasillo) {
    divPasilloClase = classPisado;
  }

  //Se añaden las nuevas clases a los atributos
  divPersonaje.classList.add(divPasilloClase);
  divPasillo.classList.add(classPersonaje);

  // Comprueba si se ha descubierto el pergamino
  comprobarPergamino(divPasillo);
  // Comprueba el sarcofago
  comprobrarMatarMomia(idDestino);
  // Comprueba si el personaje se encuentra en la misma posición que una momia
  comprobrarMatarPersonaje(idDestino);
  actualizarPuntuacion();

}

// Funcion que añade a una momia aleatoriamente
function agregarMomia() {

  let vectorPasillo = document.getElementsByClassName(classPasillo);
  let vectorPisado = document.getElementsByClassName(classPisado);
  let vectorClases = new Array();

  for (var i = 0; i < vectorPasillo.length; i++) {
    vectorClases.push(vectorPasillo[i]);
  }

  for (var i = 0; i < vectorPisado.length; i++) {
    vectorClases.push(vectorPisado[i]);
  }


  for (var i = 0; i < vectorClases.length; i++) {

    //Añade al vector de posiciones los id de los pasillos que no pertenecen al primer pasillo horizontal
    if (!vectorClases[i].id.match(/^2-/)) {
      vectorPosicionMomia.push(vectorClases[i].id);
    }

  }

  //console.log(vectorPosicionMomia);
  /*TODO probablemente se tenga que moficar este bloque de abajo cuando en la posición aleatoria
   * obtenida ya exista una momia o un personaje se genere en otra posición
   */
  let indexRandom = Math.floor(Math.random() * vectorPosicionMomia.length);
  let id = vectorPosicionMomia[indexRandom];
  let nodoMomia = document.getElementById(id);
  let momia = document.createElement("div");

  if (nodoMomia.childNodes.length == 0) {

    momia.classList.add(classMomia);
    nodoMomia.appendChild(momia);

    //Por cada momia creada se crea un objeto el cual es guardado en un vector de objetos Momias
    let momiaOBJ = new Object();
    momiaOBJ.idMomia = id;
    momiaOBJ.direccion = 0;
    momiaOBJ.movimiento = false;
    vectorMomias.push(momiaOBJ);
  }
}

//Apartado de la I.A
//Se mueve aleatoria mente pero falta implentar que busque otra dirección cuando encuentre un nuevo camino, o vea al personaje para seguirlo
function iaMomia() {

  if (document.getElementById("_contenedor").childNodes.length == (16 * 23)) {
    for (let index = 0; index < vectorMomias.length; index++) {
      comprobarMovimientoMomia(vectorMomias[index]);
    }
  }

};

/*Funcion que comprueba desde la posición actual de la momia hacia que direcciones puede dirigirse
 *   guarda estás en un vector y elige una dirección aleatoriamente, si la momia ya tiene una dirección
 *   fijada está continuara moviendose en dicha dirección
 */
function comprobarMovimientoMomia(objeto) {

  let separador = objeto.idMomia.split("-");
  let fila = parseInt(separador[0]);
  let col = parseInt(separador[1]);
  let vectorDirecciones = new Array();
  let arribaM = document.getElementById((fila - 1) + "-" + (col));
  let abajoM = document.getElementById((fila + 1) + "-" + (col));
  let izquierdaM = document.getElementById((fila) + "-" + (col - 1));
  let derechaM = document.getElementById((fila) + "-" + (col + 1));

  if (objeto.direccion == 0) {

    if (arribaM.className == classPasillo || arribaM.className == classPisado || arribaM.className == classPersonaje ) {
      
      vectorDirecciones.push(arribaM.id);
    }

    if (abajoM.className == classPasillo || abajoM.className == classPisado || abajoM.className == classPersonaje ) {
     
      vectorDirecciones.push(abajoM.id);
    }

    if (izquierdaM.className == classPasillo || izquierdaM.className == classPisado || izquierdaM.className == classPersonaje ) {
      
      vectorDirecciones.push(izquierdaM.id);
    }

    if (derechaM.className == classPasillo || derechaM.className == classPisado || derechaM.className == classPersonaje ) {
      
      vectorDirecciones.push(derechaM.id);
    }

    let indexRandom = Math.floor(Math.random() * vectorDirecciones.length);

   
    //Comprueba si en las direcciones posibles se encuentra el personaje
    let posibleDireccion = comprobarSeguirPersonaje(objeto, vectorDirecciones);


    if (posibleDireccion != 0 ) {
      moverMomia(objeto, posibleDireccion);
    }else{
      moverMomia(objeto, vectorDirecciones[indexRandom]);
    } 

  } else {
    continuarMovimiento(objeto);
  }
}

//Sigue la direcciónes comprobando si hay un personaje en alguna de las posibles direcciones
/*
    Arriba: 1
    Abajo: 2
    Izquierda: 3
    Derecha: 4
*/
function comprobarSeguirPersonaje(posicionInicial, direcciones){

  let personajeDireccion = 0;

  for (let index = 0; index < direcciones.length; index++) {
    
    let continuar = true;
    let filaAux = parseInt(direcciones[index].split("-")[0]);
    let colAux = parseInt(direcciones[index].split("-")[1]);
    let divComprobar = document.getElementById(direcciones[index]);
    let direccion = obtenerDireccion(posicionInicial, divComprobar);

    do {
      
      let id = filaAux +"-"+ colAux;
      let div = document.getElementById(id).className;

      if (div == classPasillo || div == classPisado || div == classPersonaje) {

        if (div == classPersonaje) {

          personajeDireccion = direcciones[index];
          continuar = false;

        } else {

          if (direccion == 1) {
            filaAux--;
          } else if (direccion == 2) {
            filaAux++;
          } else if (direccion == 3) {
            colAux--;
          } else if (direccion == 4) {
            colAux++;
          }
        }
      }else{

        continuar = false;
       
      }

    } while (continuar);

  }

  return personajeDireccion;
  
}

/*Mediante la comparación de la filas y columnas de dos posiciónes devolvera a que dirección se dirigira la momia
*
    Arriba: 1
    Abajo: 2
    Izquierda: 3
    Derecha: 4
*/
function obtenerDireccion(inicial, cambio) {

  let filaIni = parseInt(inicial.idMomia.split("-")[0]);
  let colIni = parseInt(inicial.idMomia.split("-")[1]);
  let filaCam = parseInt(cambio.id.split("-")[0]);
  let colICam = parseInt(cambio.id.split("-")[1]);
  let nDireccion = 0;

  if (filaIni > filaCam) {
    nDireccion = 1;
  }
  if (filaIni < filaCam) {
    nDireccion = 2;
  }
  if (colIni > colICam) {
    nDireccion = 3;
  }
  if (colIni < colICam) {
    nDireccion = 4;
  }

  return nDireccion;
}

//Mueve la momia e iniciliza los valores del objeto momia para seguir moviendose
function moverMomia(obj, direccionMover) {

  let divMomia = document.getElementById(obj.idMomia);
  divMomia.removeChild(divMomia.childNodes[0]);
  let divCambio = document.getElementById(direccionMover);

  //Fija la dirección a la que irá la momia
  obj.direccion = obtenerDireccion(obj, divCambio);

  let momia = document.createElement("div");
  momia.classList.add(classMomia);
  divCambio.appendChild(momia);

  //Modifica los atributos del objeto momia con una nueva posición y
  obj.idMomia = direccionMover;
  obj.movimiento = true;

  comprobrarMatarPersonaje(direccionMover);
}

//Continua moviendo la momia en su dirección fijada hasta que no puede más o se encuentre con otro pasillo
function continuarMovimiento(objeto) {

  let separar = objeto.idMomia.split("-");
  let fila = parseInt(separar[0]);
  let col = parseInt(separar[1]);
  let direccion = objeto.direccion;

  if (direccion == 1) {
    fila--;
  } else if (direccion == 2) {
    fila++;
  } else if (direccion == 3) {
    col--;
  } else if (direccion == 4) {
    col++;
  }

  let divCambio = document.getElementById(fila + "-" + col);
  let divClase = divCambio.className;

  if (divClase == classPasillo || divClase == classPisado || divClase == classPersonaje) {

    if (!comprobarNuevosPasillos(objeto)) {
      moverMomia(objeto, divCambio.id)
    } else {
      objeto.direccion = 0;
      objeto.movimiento = false;
      comprobarMovimientoMomia(objeto);
    }

  } else {
    objeto.direccion = 0;
    objeto.movimiento = false;
    comprobarMovimientoMomia(objeto);
  }
}

//Función que comprueba si hay nuevos pasillos a los que puede obtar la momia para cambiar de dirección
function comprobarNuevosPasillos(objeto) {

  let separar = objeto.idMomia.split("-");
  let fila = parseInt(separar[0]);
  let col = parseInt(separar[1]);
  let izquierdaM = document.getElementById((fila) + "-" + (col - 1)).className;
  let derechaM = document.getElementById((fila) + "-" + (col + 1)).className;
  let arribaM = document.getElementById((fila - 1) + "-" + (col)).className;
  let abajoM = document.getElementById((fila + 1) + "-" + (col)).className;
  let nuevoPasillo = false;

  if (objeto.direccion < 3) {

    if (izquierdaM == classPasillo || izquierdaM == classPisado || derechaM == classPasillo || derechaM == classPisado) {
      nuevoPasillo = true;
    }
  } else {

    if (arribaM == classPasillo || arribaM == classPisado || abajoM == classPasillo || abajoM == classPisado) {
      nuevoPasillo = true;
    }
  }

  return nuevoPasillo
};

function comprobarPergamino(personaje) {

  let id = document.getElementsByClassName(classPergamino)[0].id;
  let divPergamino = document.getElementById(id).className;
  if (divPergamino.includes(classDescubierto)) {
    let mamados = document.getElementsByClassName(classMamadisimo);

    for (let index = 0; index < mamados.length; index++) {
      let idMamado = mamados[index].id;
      document.getElementById(idMamado).classList.remove(classMamadisimo);
    }

    personaje.classList.add(classMamadisimo);
  }
}

function comprobarSarcofago() {

  let id = document.getElementsByClassName(classSarcofago)[0].id;
  if (document.getElementById(id).className.includes(classDescubierto)) {
    agregarMomia();
    numeroMomias++;
    let sarcofagos = document.getElementsByClassName(classSarcofago);
    for (var i = 0; i < sarcofagos.length; i++) {
      document.getElementById(sarcofagos[i].id).classList.remove(classDescubierto);
    }
  }
}

//Funcion utilizada para comprobar si el personaje tiene la capacidad de matar a la momia que está en su misma posición
function comprobrarMatarMomia(id) {

  let personaje = document.getElementById(id);
  if (personaje.className.includes(classMamadisimo)) {

    if (personaje.childNodes.length > 0) {

      let momias = personaje.childNodes[0];
      personaje.removeChild(momias);

      for (var i = 0; i < vectorMomias.length; i++) {

        if (vectorMomias[i].idMomia == id) {
          let momia = vectorMomias[i];
          vectorMomias = removerItem(vectorMomias, momia);
        }
      }

      //Quita descubierto de los pergaminos
      let pergaminos = document.getElementsByClassName(classPergamino);

      for (var i = 0; i < pergaminos.length; i++) {
        document.getElementById(pergaminos[i].id).classList.remove(classDescubierto);
      }

      personaje.classList.remove(classMamadisimo);
      numeroMomias--;
      puntuacion+=30;
    }
  }
}

//Función que comprueba que el persoanje y la momia están en la misma posición, si el personaje no posee el pergamino la momia y el personaje momirán
function comprobrarMatarPersonaje(id) {

  let personaje = document.getElementById(id);
  if (personaje.className.includes(classPersonaje) && !personaje.className.includes(classMamadisimo)) {

    if (personaje.childNodes.length > 0) {

      let momias = personaje.childNodes[0];
      personaje.removeChild(momias);

      for (var i = 0; i < vectorMomias.length; i++) {
        if (vectorMomias[i].idMomia == id) {

          let momia = vectorMomias[i];
          vectorMomias = removerItem(vectorMomias, momia);
          numeroMomias--;
        }
      }

      personaje.classList.remove(classPersonaje);
      personaje.classList.add(classPisado);
      numeroVidas--;

      if (numeroVidas > 0) {
        invocarPersonaje();
      }else {

        let contenedor = document.getElementById("_contenedor");
        while (contenedor.firstChild) {
          contenedor.removeChild(contenedor.firstChild)
        }

        document.getElementsByTagName('body')[0].classList.add("gameover");

      }

    }
  }
}

//Función utilizada para invocar al personaje cuando este muere
function invocarPersonaje() {
  let id = "2-11"
  document.getElementById(id).classList.add(classPersonaje);
}

//Función utilizada para comprobar que la llave y la urna están descubiertas
//Si están descubiertas se añadirá la puerta y el personaje podrá continuar al siguiente nivel
function comprobarPuerta() {

  let urnas = document.getElementsByClassName(classUrna);
  let llaves = document.getElementsByClassName(classLlave);
  let iteraciones = urnas.length;

  if (urnas[0].className.includes(classDescubierto) && llaves[0].className.includes(classDescubierto)) {

    document.getElementById("1-11").classList.remove(classPisado);
    document.getElementById("1-11").classList.add(classPuerta);

    for (var i = 0; i < iteraciones; i++) {
      urnas[i].classList.remove(classDescubierto);
      llaves[i].classList.remove(classDescubierto);
    }
  }
}

//Cambia de nivel añadiendo una nueva momia
function recargar() {
  numeroMomias++;
  vectorMomias = new Array();
  crearMapa(fila, col);
}

//Agrega los paneles de en posiciones estáticas
function agregarPaneles() {

  let imgVida = document.getElementById("0-14");
  let conVidas = document.getElementById("0-15");
  let imgMomias = document.getElementById("0-17");
  let conMomias = document.getElementById("0-18");
  let imgPuntuacion = document.getElementById("0-20");
  let conPuntuacion = document.getElementById("0-21");

  imgVida.classList.remove(classBorde);
  conVidas.classList.remove(classBorde);
  imgMomias.classList.remove(classBorde);
  conMomias.classList.remove(classBorde);
  imgPuntuacion.classList.remove(classBorde);
  conPuntuacion.classList.remove(classBorde);

  imgVida.classList.add("vidas");
  conVidas.classList.add("vidasContador");
  imgMomias.classList.add("momias");
  conMomias.classList.add("momiasContador");
  imgPuntuacion.classList.add("puntuacion");
  conPuntuacion.classList.add("puntuacionContador");
  imgPuntuacion.innerText = "Ptos:"
  imgMomias.innerText = "Mons:"
  actualizarPuntuacion();

}

//Función que actualizar los paneles con nueva información cada vez que es llamada
function actualizarPuntuacion(){

  let conVidas = document.getElementById("0-15");
  let conMomias = document.getElementById("0-18");
  let conPuntuacion = document.getElementById("0-21");

  conVidas.innerText = numeroVidas;
  conMomias.innerText = numeroMomias;
  conPuntuacion.innerText = puntuacion;

}
