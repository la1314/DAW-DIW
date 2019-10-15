window.onload = function () {

    /*Se requieren de 16 filas y 23 columnas
    */
    let fila = 16;
    let col = 23
    let classfondo = "fondo";
    let classBorde = "borde";
    let classRectangulo = "rectangulo";
    let matrizNodos

    
    for (let f = 0; f < fila; f++) {
        for (let c = 0; c < col; c++) {
            if (c == 0 || f == 0 || c == col-1 || f == fila-1 || f == 1 ) {
                addNodos(f,c, classBorde);
            } else {
                addNodos(f,c, classfondo);
            }
        }
        
    }

   
}

function addNodos(fila, col, clase){
    var nodo = document.createElement("div");
    nodo.id = fila+""+col;
    nodo.classList.add(clase);
    nodo.innerText = fila + "-" + col;
    document.getElementById("_contenedor").appendChild(nodo);

}

function propagarRectangulo(){

}