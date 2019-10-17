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

function addNodos(fila, col, clase) {
    var nodo = document.createElement("div");
    nodo.id = fila + "-" + col;
    //Ver posición de cada celda
    //nodo.innerText = fila + "-" + col;
    nodo.classList.add(clase);
    document.getElementById("_contenedor").appendChild(nodo);

}

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

function generarObjetos(vector) {

    let iterandos = vector.length;
    console.log(vector);
    let indexRandom = Math.floor(Math.random() * vector.length);
    let valor = vector[indexRandom].split("-");
    propagarRectangulo(valor[0], valor[1], "rectangulo", "pasillo");
    vector.splice(indexRandom, indexRandom);
    console.log(vector);

}

function propagarRectangulo(fil, col, clase, claseRetirar) {

    console.log(fil);
    console.log(col);    
   /* document.getElementById(fil + "-" + col).classList.remove(claseRetirar);
    document.getElementById(fil + "-" + (col - 1)).classList.remove(claseRetirar);
    document.getElementById((fil - 1) + "-" + (col - 1)).classList.remove(claseRetirar);
    document.getElementById((fil - 1) + "-" + col).classList.remove(claseRetirar);
    document.getElementById((fil - 1) + "-" + (col + 1)).classList.remove(claseRetirar);
    document.getElementById(fil + "-" + (col + 1)).classList.remove(claseRetirar);*/

    document.getElementById(fil + "-" + col).classList.add(clase);
    document.getElementById(fil + "-" + (col - 1)).classList.add(clase);
    document.getElementById((fil - 1) + "-" + (col - 1)).classList.add(clase);
    document.getElementById((fil - 1) + "-" + col).classList.add(clase);
    document.getElementById((fil - 1) + "-" + (col + 1)).classList.add(clase);
    document.getElementById(fil + "-" + (col + 1)).classList.add(clase);

}