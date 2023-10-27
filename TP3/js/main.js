const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const widthCanvas = canvas.offsetWidth; 
const heightCanvas = canvas.offsetHeight;

let tablero = new Tablero(6,6,ctx);
tablero.reiniciarTablero();
tablero.mostrarFichas();
canvas.addEventListener("mousedown",(e)=>{
    tablero.seleccionarFicha(e)
})
canvas.addEventListener("mousemove",(e)=>{
    tablero.moverFicha(e)
})
canvas.addEventListener("mouseup",(e)=>{
    tablero.deseleccionarFicha(e)
})