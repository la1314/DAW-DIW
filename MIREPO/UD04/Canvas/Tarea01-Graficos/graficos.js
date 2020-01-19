function buildGrafico() {
  console.info(" * Construyendo grafico ");
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let marcoH = canvas.height * 0.05;
  let marcoW = canvas.width * 0.10;

  let claves = document.querySelectorAll("input[class='left']");
  let valores = document.querySelectorAll("input[class='right']");

  let valorTotal = 0;

  valores.forEach(item => {
      valorTotal += parseInt(item.value);
  });

  let altoBarras = canvas.height - marcoH;
  let anchoBarras = (canvas.width-marcoW)/4;
  let x = marcoW/2;
  let y = canvas.height-marcoH;
  let alturaBarra;

  for (let index = 0; index < valores.length; index++) {

    ctx.fillStyle = dioses[index].color;

    alturaBarra = (altoBarras * (valores[index].value / valorTotal));
    /*
    * X = marcoW como punto de inicio, posteriormente a este valor se le suma el ancho de barras en la siguiente iteración
    * Y = Marca el punto donde se empezara a dibujar en este caso nos interesa que empiece en la parte de abajo
    */

    ctx.fillRect(x, y, anchoBarras, -alturaBarra);
     x += anchoBarras;
    //ctx.stroke();

    //Lineas falta unir puntos
    //alturaBarra = (canvas.width-marcoW) - (altoBarras * (valores[index].value / valorTotal));
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(x, altoBarras);
    // ctx.lineTo(x, alturaBarra);
    // ctx.stroke();
    //x += anchoBarras;


    //console.log(x);


  }

}

function loadListeners() {
  document.querySelector("input[name='grafiqueame']").addEventListener("click", buildGrafico);
}

function init() {

  console.log(" * Init ");

  document.querySelectorAll("input[class='left']").forEach((item, i) => {

    //console.log(item);
    //console.log(dioses[i].nombre);
    item.value = dioses[i].nombre;
  });

  document.querySelectorAll("input[class='right']").forEach((item, i) => {

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
