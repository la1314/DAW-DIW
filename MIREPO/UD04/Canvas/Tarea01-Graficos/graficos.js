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

  let altoDibujable = canvas.height - marcoH;

  let anchoBarras = (canvas.width - marcoW) / valores.length;
  let x = marcoW / 2;
  let y = canvas.height - marcoH;

  //dibujarBarras(ctx, x, y, anchoBarras, altoDibujable, valorTotal, valores);
  dibujarLineas(ctx, x, anchoBarras, altoDibujable, valorTotal, valores);

}

//Por refactorizar
//Función que dibuja una gráfica de barras mediante los valores dados
function dibujarBarras(ctx, x, y, anchoBarras, altoDibujable, valorTotal, valores) {

  let alturaBarra;

  for (let index = 0; index < valores.length; index++) {

    ctx.fillStyle = dioses[index].color;

    alturaBarra = (altoDibujable * (valores[index].value / valorTotal));
    /*
    * X = marcoW como punto de inicio, posteriormente a este valor se le suma el ancho de barras en la siguiente iteración
    * Y = Marca el punto donde se empezara a dibujar en este caso nos interesa que empiece en la parte de abajo
    */

    ctx.fillRect(x, y, anchoBarras, -alturaBarra);
    x += anchoBarras;
    //ctx.stroke();

    //Lineas falta unir puntos
    //alturaBarra = (canvas.width-marcoW) - (altoDibujable * (valores[index].value / valorTotal));
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(x, altoDibujable);
    // ctx.lineTo(x, alturaBarra);
    // ctx.stroke();
    //x += anchoBarras;


    //console.log(x);


  }
}

function dibujarLineas(ctx, x, anchoBarras, altoDibujable, valorTotal, valores) {
  let alturaBarra;
  //Centra el punto de inicio a la mitad ocupable de una barra imaginaria
 
  let xPunto = x + anchoBarras/2;
  let xLinea = x + anchoBarras/2;
  let coordenadas = new Array();
  coordenadas = [];

  for (let index = 0; index < valores.length; index++) {

    ctx.fillStyle = dioses[index].color;
    /*
    * X = marcoW como punto de inicio, posteriormente a este valor se le suma el ancho de barras en la siguiente iteración
    * Y = Marca el punto donde se empezara a dibujar en este caso nos interesa que empiece en la parte de abajo
    */
   

    //Lineas falta unir puntos
    alturaBarra = (altoDibujable) - (altoDibujable * (valores[index].value / valorTotal));
    ctx.lineWidth = 2;
    ctx.beginPath();
    /* ctx.moveTo(x, altoDibujable);
    ctx.lineTo(x, alturaBarra); */
    ctx.arc(xPunto, alturaBarra, 3, 0, 2 * Math.PI);
    let coordenada = new Object();
    coordenada.x = xPunto;
    coordenada.y = alturaBarra;

    coordenadas.push(coordenada);

    console.log(xPunto + " - " + alturaBarra);
    coordenadas = 
    ctx.stroke();
    xPunto += anchoBarras;

  }

  for (let index = 0; index < valores.length-1; index++) {

    alturaBarra = (altoDibujable) - (altoDibujable * (valores[index].value / valorTotal));
    ctx.beginPath();
    ctx.moveTo(xLinea, altoDibujable);
    ctx.lineTo(xLinea, alturaBarra); 
    ctx.stroke();
  }
}

function dibujarQuesito(params) {

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
