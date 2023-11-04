/*let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let widthCanvas = canvas.width;
let heightCanvas = canvas.height;

let nEnLinea = 4; // dato obtenido de form
let cantFichasPorEquipo = ((nEnLinea + 2) * (nEnLinea + 3)) / 2;
let tamanioFicha = 80; //datoHardcodeado, puede variar dependiendo de tamaño, de momento fijo
let xInicialTablero = 345; // posicion inicial del tablero eje X
let yInicialTablero = 195; // posicion inicial del tablero eje Y
let imgViale = "../../assets/images/Juego/ficha_viale.png";
let imgSamid = "../../assets/images/Juego/ficha_samid.png";
const imgBackGround = "../../assets/images/Juego/fondoCanvas.jpg"
let tablero = new Tablero(ctx, nEnLinea, tamanioFicha);
let turno = new Turno();

let juego = new Juego(nEnLinea,ctx,tablero);
juego.generateContenedorDeFichas(45,80,widthCanvas/3,heightCanvas/2,imgViale,1);
juego.generateContenedorDeFichas(45,80,widthCanvas/3,heightCanvas/2,imgSamid,2);
tablero.draw();
let contenedor_jugador1 = new ContenedorFichas(
  45,
  80,
  widthCanvas / 3,
  heightCanvas / 2,
  ctx,
  imgViale,
  cantFichasPorEquipo,
  1
);
let contenedor_jugador2 = new ContenedorFichas(
  widthCanvas - 270,
  80,
  widthCanvas / 3,
  heightCanvas / 2,
  ctx,
  imgSamid,
  cantFichasPorEquipo,
  2
);
contenedor_jugador1.draw();
contenedor_jugador2.draw();

let clickeando = false;
let fichaClickeada = null;

canvas.addEventListener("mousedown", (e) => { //Busca click en ficha.
  clickeando = true;
  if (fichaClickeada != null) {
    fichaClickeada = null;
  }
  if (turno.getTurno() == 1) { // Si es el turno del jugador 1 busca en él, si no en el 2
    fichaClickeada = contenedor_jugador1.seleccionarFicha(e); // Si la ficha seleccionada está aca, la retorna. Si no null
  } else {
    fichaClickeada = contenedor_jugador2.seleccionarFicha(e);
  }
});
canvas.addEventListener("mouseup", (e) => { // suelto ficha
  clearCanvas();
  if (lugarCorrectoParaLanzar(e.offsetX, e.offsetY) && fichaClickeada) { // Calcula si donde deje la ficha esta arriba (SECCION INVISIBLE)
    let columna = calcularColumna(e.offsetX); //
    let exitoso = tablero.agregarFichaEn(columna, fichaClickeada);
    if (!exitoso) {
      // se dejo en columna no disponible, por lo que tiene que volver al contenedor
      if (turno.getTurno() == 1) {
        contenedor_jugador1.agregarFicha(fichaClickeada);
      } else {
        contenedor_jugador2.agregarFicha(fichaClickeada);
      }
    } else {
      // columna disponible, hay que sacarle la ficha del contenedor
      if (turno.getTurno() == 1) {
        contenedor_jugador1.quitarFicha(fichaClickeada);
        turno.changeTurno(2);
      } else {
        contenedor_jugador2.quitarFicha(fichaClickeada);
        turno.changeTurno(1);
      }
    }
  } else if (fichaClickeada != null) {

    //mando la ficha en lugar equivodado
    let posInicialX = fichaClickeada.getPositionInicial().x;
    let posInicialY = fichaClickeada.getPositionInicial().y;


    animarFichaRegreso(fichaClickeada,posInicialX,posInicialY,e.offsetX,e.offsetY)
 
  }
  fichaClickeada = null;
});

// hay problemas cuando el mouse sale del canvas

canvas.addEventListener("mousemove", (e) => {
  if (clickeando && fichaClickeada != null) {
    // cambio la posicion y dibujo todo de nuevo.
    let img = fichaClickeada.getImage();
    fichaClickeada.setPosition(
      e.offsetX - img.width / 2.5,
      e.offsetY - img.height / 2.5
    );
    clearCanvas();
    mostrarCirculosGuia();
    fichaClickeada.draw();
  }
});

function lugarCorrectoParaLanzar(x, y) {
    let xValido =(x > xInicialTablero && x < (nEnLinea+3)*tamanioFicha*2+xInicialTablero)
  let yValido = (
    yInicialTablero - y - (1 / 2) * tamanioFicha <= tamanioFicha &&
    yInicialTablero > y
  );
  return xValido && yValido
}
function calcularColumna(x) {
  // x es donde deje la ficha, siempre me quedo con la columna anterior si es que está en el medio
  let colum = Math.floor((x - xInicialTablero) / (tamanioFicha * 2));
  return colum;
}
function clearCanvas() {
  let imgFondo = new Image();
  imgFondo.src = imgBackGround;
  ctx.drawImage(imgFondo, 0, 0,1080,720);
  tablero.draw();
  contenedor_jugador1.draw();
  contenedor_jugador2.draw();

}
function mostrarCirculosGuia() {
  for (let i = 0; i < nEnLinea + 3; i++) {
    ctx.beginPath();
    ctx.arc(
      xInicialTablero + 30 + (tamanioFicha + 30) * i,
      yInicialTablero - 25,
      tamanioFicha / 1.5,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.closePath;
  }
}

function animarFichaRegreso(ficha, initialX, initialY,targetX,targetY) {
    // FUNCIONA, sin animacion
    /*ficha.setPosition(initialX,initialY);
    clearCanvas();*/

  /*  const duration = 1000; // Duración de la animación en milisegundos
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const newX = targetX + (initialX - targetX) * progress;
            const newY = targetY + (initialY - targetY) * progress;

            ficha.setPosition(newX, newY);
            clearCanvas();

            requestAnimationFrame(animate);
        } else {
            // La animación ha terminado, asegúrate de que la posición final sea exacta
            ficha.setPosition(initialX, initialY);
            clearCanvas();
        }
    }

    requestAnimationFrame(animate);

}*/
