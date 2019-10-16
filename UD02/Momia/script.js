window.onload = function () {

    /*Se requieren de 16 filas y 23 columnas
    */
    let fila = 16;
    let col = 23
    let classfondo = "fondo";
    let classBorde = "borde";
    let classRectangulo = "rectangulo";
   

    
    for (let f = 0; f < fila; f++) {
        for (let c = 0; c < col; c++) {
            if (c == 0 || f == 0 || c == col-1 || f == fila-1 || f == 1 ) {
                addNodos(f,c, classBorde);
            } else {
                addNodos(f,c, classfondo);
            }
        }
        
    }

    agregarRectangulos(4,5,classRectangulo, classfondo);
   
   
}

function addNodos(fila, col, clase){
    var nodo = document.createElement("div");
    nodo.id = fila+"-"+col;
    nodo.innerText = fila+"-"+col;
    nodo.classList.add(clase);
    document.getElementById("_contenedor").appendChild(nodo);

}

function agregarRectangulos(filas, columnas, clase, claseRetirar){

    let inicioF = 4;
    let inicioC = 3;

    for (let fil = 0; fil < filas; fil++) {

        for (let col = 0; col < columnas; col++) {
            
            propagarRectangulo(inicioF, inicioC, clase, claseRetirar);
            inicioC+=4; 
        }
        inicioC = 3;
        inicioF+=3;
    }
}

function propagarRectangulo(fil, col, clase, claseRetirar){

    document.getElementById(fil+"-"+col).classList.remove(claseRetirar);
    document.getElementById(fil+"-"+(col-1)).classList.remove(claseRetirar);
    document.getElementById((fil-1)+"-"+(col-1)).classList.remove(claseRetirar);
    document.getElementById((fil-1)+"-"+col).classList.remove(claseRetirar);
    document.getElementById((fil-1)+"-"+(col+1)).classList.remove(claseRetirar);
    document.getElementById(fil+"-"+(col+1)).classList.remove(claseRetirar);

    document.getElementById(fil+"-"+col).classList.add(clase);
    document.getElementById(fil+"-"+(col-1)).classList.add(clase);
    document.getElementById((fil-1)+"-"+(col-1)).classList.add(clase);
    document.getElementById((fil-1)+"-"+col).classList.add(clase);
    document.getElementById((fil-1)+"-"+(col+1)).classList.add(clase);
    document.getElementById(fil+"-"+(col+1)).classList.add(clase);

}