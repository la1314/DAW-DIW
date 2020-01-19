function buildGrafico() {
  console.info(" * Construyendo grafico ");
}

function loadListeners() {
  document.querySelector("input[name='grafiqueame']").addEventListener("click", buildGrafico);
}


function init() {
  console.log(" * Init ");

  document.querySelectorAll("input[class='left']").forEach( (item, i) => {

    //console.log(item);
    //console.log(dioses[i].nombre);
    item.value = dioses[i].nombre;

  });


  document.querySelectorAll("input[class='right']").forEach( (item, i) => {

    item.value = dioses[i].poder;
  });

  loadListeners();

}


window.onload = init;

const dioses = [{
    nombre: "Cthulhu",
    poder: 1000,
    color: "green"
  },
  {
    nombre: "Nyarlatothep",
    poder: 600,
    color: "red"
  },
  {
    nombre: "Azazoth",
    poder: 1400,
    color: "grey"
  },
  {
    nombre: "Pepe",
    poder: 800,
    color: "purple"
  }
];

//let anguloActual = -0.5 * Math.PI;
