function init (){
    
    let container = document.querySelector('container');

    for (let index = 0; index < 10; index++) {
        
        let boton = document.createElement('button');
        boton.value = index;
        boton.innerText = index;
        boton.addEventListener('click', addClickVAlor);
        
        container.appendChild(boton);   
    }

    window.addEventListener('keydown', addTeclaValor);

}

function addClickVAlor(){

    let result = document.querySelector('result');
    result.innerHTML+= this.value;

}

function addTeclaValor(e){

    if (e.key >= 0 || e.key < 10 ) {
        let result = document.querySelector('result');
        result.innerHTML+= e.key;
    }

}

window.onload = init;
