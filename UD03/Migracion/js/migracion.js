/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function startMigration(){
    
    let spanes = document.querySelectorAll('progress');
    spanes.forEach(element => element.value = index);
    
    
    // Fragmentos perdidos
    // ^(;,;)^
}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click",startMigration);
}

// Init the environment when all is ready
window.onload=init;
