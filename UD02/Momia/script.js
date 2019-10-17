window.onload = function () {

    /*Se requieren de 16 filas y 23 columnas
    */
    let fila = 16;
    let col = 23
    let classPasillo = "pasillo";
    let classBorde = "borde";
    let vectorObjetos = new Array();

    for (let f = 0; f < fila; f++) {
        for (let c = 0; c < col; c++) {
            if (c == 0 || f == 0 || c == col - 1 || f == fila - 1 || f == 1) {
                addNodos(f, c, classBorde);
            } else {
                addNodos(f, c, classPasillo);
            }
        }
    }

    vectorObjetos = agregarRectangulos(4, 5, vectorObjetos);
    generarObjetos(vectorObjetos);


}

/*
* Crea y añade div al contenedor asignandole a cada uno una ID única
* las cuales están representadas en posiciones de una matriz
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
 * Dado el mapa actual del juego pasamos el numemos de objetos que habŕan por fila y columnas
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

//Genera los objetos con los que interactua el personaje, através de un vector que contiene
// las posiciones donde pueden aparecer dichos objetos
function generarObjetos(vector) {

    let iterandos = vector.length;
    console.log(vector);

    for (let index = 0; index < iterandos; index++) {

        let clase = "oculto";

        if (index == 0) {
            clase = "llave"
        } else if (index == 1) {
            clase = "sarcofago"
        } else if (index == 2) {
            clase = "pergamino"
        } else if (index == 3) {
            clase = "urna"
        }

        let indexRandom = Math.floor(Math.random() * vector.length);
        let valor = vector[indexRandom].split("-");
        propagarRectangulo(valor[0], parseInt(valor[1]), clase, "pasillo");
        vector = removerItem(vector, vector[indexRandom]);
        console.log(vector);

    }

}

/*
* Mediante una coordenada elimina una clase y añade otra clase a los lados y encima del punto inicial
*/
function propagarRectangulo(fil, col, clase, claseRetirar) {

    //Retira la clase anterior
    document.getElementById(fil + "-" + col).classList.remove(claseRetirar);
    document.getElementById(fil + "-" + (col - 1)).classList.remove(claseRetirar);
    document.getElementById((fil - 1) + "-" + (col - 1)).classList.remove(claseRetirar);
    document.getElementById((fil - 1) + "-" + col).classList.remove(claseRetirar);
    document.getElementById((fil - 1) + "-" + (col + 1)).classList.remove(claseRetirar);
    document.getElementById(fil + "-" + (col + 1)).classList.remove(claseRetirar);

    //Añade la nueva clase
    document.getElementById(fil + "-" + col).classList.add(clase);
    document.getElementById(fil + "-" + (col - 1)).classList.add(clase);
    document.getElementById((fil - 1) + "-" + (col - 1)).classList.add(clase);
    document.getElementById((fil - 1) + "-" + col).classList.add(clase);
    document.getElementById((fil - 1) + "-" + (col + 1)).classList.add(clase);
    document.getElementById(fil + "-" + (col + 1)).classList.add(clase);

}

// Elimina un elemento de un arrray
function removerItem(vector, item) {
    return vector.filter(function (e) {
        return e !== item;
    });
};