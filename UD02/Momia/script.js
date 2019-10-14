window.onload = function () {

    

    for (let index = 0; index < 120; index++) {

        addNodos(index);
        
    }

}

function addNodos(index){

    var nodo = document.createElement("div");
    nodo.classList.add("cuadrados");
    document.getElementById("_contenedor").appendChild(nodo);
   
   
}