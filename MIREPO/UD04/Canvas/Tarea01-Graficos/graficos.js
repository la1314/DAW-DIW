function buildGrafico() {
  console.info(" * Construyendo grafico ");
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let marcoH = canvas.height * 0.05;
  let marcoW = canvas.width * 0.10;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let opciones = document.querySelector("select[name='graficos']");
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

  switch (opciones.value) {

    case 'barras':
      dibujarBarras(ctx, x, y, anchoBarras, altoDibujable, valorTotal, valores, claves);
      break;

    case 'lineas':
      dibujarLineas(ctx, x, anchoBarras, altoDibujable, valorTotal, valores, claves);
      break;

    case 'quesito':
      dibujarQuesito(ctx, valorTotal, valores, claves);
      break;


  }

}

//Por refactorizar
//Función que dibuja una gráfica de barras mediante los valores dados
function dibujarBarras(ctx, x, y, anchoBarras, altoDibujable, valorTotal, valores, claves) {

  let alturaBarra;

  for (let index = 0; index < valores.length; index++) {

    ctx.fillStyle = dioses[index].color;

    alturaBarra = (altoDibujable * (valores[index].value / valorTotal));
    alturaTexto = (altoDibujable) - (altoDibujable * (valores[index].value / valorTotal));
    /*
     * X = marcoW como punto de inicio, posteriormente a este valor se le suma el ancho de barras en la siguiente iteración
     * Y = Marca el punto donde se empezara a dibujar en este caso nos interesa que empiece en la parte de abajo
     */

    ctx.fillRect(x, y, anchoBarras, -alturaBarra);

    ctx.font = '15pt Arial';
    ctx.fillText(claves[index].value, x, alturaTexto-5);

    x += anchoBarras;
    //ctx.stroke();

    

  }

  
}

function dibujarLineas(ctx, x, anchoBarras, altoDibujable, valorTotal, valores, claves) {
  let alturaBarra;
  //Centra el punto de inicio a la mitad ocupable de una barra imaginaria

  let xPunto = x + anchoBarras / 2;
  let coordenadas = new Array();


  for (let index = 0; index < valores.length; index++) {


    //Puntos
    ctx.strokeStyle = dioses[index].color;
    alturaBarra = (altoDibujable) - (altoDibujable * (valores[index].value / valorTotal));
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(xPunto, alturaBarra, 5, 0, 2 * Math.PI);
    ctx.fillStyle = dioses[index].color;
    ctx.fill();
    ctx.stroke();
    

    //Objeto
    let coordenada = new Object();
    coordenada.x = xPunto;
    coordenada.y = alturaBarra;
    coordenadas.push(coordenada);


    //Nombres
    ctx.font = '15pt Arial';
    ctx.fillText(claves[index].value, xPunto, alturaBarra-5);
    xPunto += anchoBarras;

  }

  ctx.strokeStyle = "black";

  for (let index = 0; index < valores.length - 1; index++) {

    alturaBarra = (altoDibujable) - (altoDibujable * (valores[index].value / valorTotal));
    ctx.beginPath();
    ctx.moveTo(coordenadas[index].x, coordenadas[index].y);
    ctx.lineTo(coordenadas[index + 1].x, coordenadas[index + 1].y);
    ctx.stroke();
  }
}

function dibujarQuesito(ctx, valorTotal, valores, claves) {

  let canvas = document.querySelector('canvas');
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;


  ctx.beginPath();
  //ángulo de rebanada = 2 * PI * valor de categoría / valor total

  let lastend = 0;
  let coordenadas = new Array();
  for (var index = 0; index < valores.length; index++) {

    ctx.fillStyle = dioses[index].color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    let lastendPI = lastend + (Math.PI * 2 * (valores[index].value / valorTotal));
    
    ctx.arc(centerX, centerY, (centerY * 0.70), lastend, lastendPI, false);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    let coordenada = new Object();
    coordenada.grado = (360*(valores[index].value / valorTotal));
    coordenadas.push(coordenada);
    lastend += Math.PI * 2 * (valores[index].value / valorTotal);
  }

  let acumulativos = [];
  let suma = 0;
  for (let index = 0; index < coordenadas.length; index++) {
    
    suma+=coordenadas[index].grado;
    acumulativos.push(suma);
  }

  let gradros;

  for (let index = 0; index < valores.length; index++) {
    //Nombres
    ctx.save();
    ctx.font = '15pt Arial';
    ctx.fillStyle = 'white';
    ctx.translate(centerX, centerY);
    gradros = acumulativos[index] - (coordenadas[index].grado/2);
    ctx.rotate(gradros * Math.PI / 180);
 
    ctx.fillText(claves[index].value, 39, 0);

    ctx.restore();
    console.log(gradros + " -:"+ claves[index].value);
    
  }
}

function loadListeners() {
  document.querySelector("input[name='grafiqueame']").addEventListener("click", buildGrafico);
  //Borrar al acabar pruebas
  document.querySelector("input[name='grafiqueame']").click();
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
