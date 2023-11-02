let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let widthCanvas = canvas.width;
let heightCanvas = canvas.height;

const xInicialTablero = 345; // posicion inicial del tablero eje X
const yInicialTablero = 195; // posicion inicial del tablero eje Y
let nEnLinea = 4;
let tamanioFicha = 30;
let imgViale = "../../assets/images/Juego/ficha_viale.png";
let imgSamid = "../../assets/images/Juego/ficha_samid.png";
const imgBackGround = "../../assets/images/Juego/fondoCanvas.jpg"

let juego = new Juego(nEnLinea,ctx,tamanioFicha);


juego.generateContenedorDeFichas(45,80,widthCanvas/3,heightCanvas/2,imgViale,1);
juego.generateContenedorDeFichas(widthCanvas - 270,80,widthCanvas/3,heightCanvas/2,imgSamid,2);

juego.draw();

canvas.addEventListener("mousedown", (e) => {
    juego.seleccionarFicha(e);
});

canvas.addEventListener("mouseup", (e)=>{
    juego.soltarFicha(e);
})

canvas.addEventListener("mousemove", (e) => {
    juego.trasladarFicha(e);
});