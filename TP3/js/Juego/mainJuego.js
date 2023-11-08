let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let widthCanvas = canvas.width;
let heightCanvas = canvas.height;

const xInicialTablero = 345; // posicion inicial del tablero eje X
const yInicialTablero = 195; // posicion inicial del tablero eje Y
const tamanioFicha = 30;
let imgViale = "./../../assets/images/Juego/ficha_viale.png";
let imgSamid = "./../../assets/images/Juego/ficha_samid.png";
const imgBackGround = "./../../assets/images/Juego/vialesamiddisney.jpeg";

document.querySelector("#btnJugar").addEventListener("click", (e) => {
  e.preventDefault();
  let modalidad = document.querySelectorAll('input[name="modalidad"]');
  let fichaViale = document.querySelectorAll('input[name="viale"]');
  let fichaSamid = document.querySelectorAll('input[name="samid"]');
  let vM;
  let vV;
  let vS;
  modalidad.forEach((el) => {
    if (el.checked) {
      vM = el.value;
    }
  });

  fichaViale.forEach((el) => {
    if (el.checked) {
      vV = el.value;
    }
  });

  fichaSamid.forEach((el) => {
    if (el.checked) {
      vS = el.value;
    }
  });

  if (vM && vS && vV) {
    let juego = new Juego(parseInt(vM), ctx, tamanioFicha);
    let altoContenedor = 720;
    let anchoContenedor = 300;
    juego.generateContenedorDeFichas(
      0,
      anchoContenedor,
      "./../../assets/images/Juego/"+vS,
      1
    );
    juego.generateContenedorDeFichas(
      widthCanvas - 235,
      anchoContenedor,
      "./../../assets/images/Juego/"+vV,
      2
    );

    
    juego.draw();
    canvas.addEventListener("mousedown", (e) => {
      juego.seleccionarFicha(e);
    });

    canvas.addEventListener("mouseup", (e) => {
      let resultado = juego.soltarFicha(e);
      if(resultado){
        
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      juego.trasladarFicha(e);
    });
    canvas.addEventListener("mouseleave",(e)=>{
      juego.devolverFicha(e);
    })
    document.querySelector(".formularioJuego").classList.add("ocultar");
  } else {
    document.querySelector(".formularioJuego form h1").classList.add("error");
  }
});
/*
if (true) {
  let juego = new Juego(parseInt(4), ctx, tamanioFicha);
  let altoContenedor = 720;
  let anchoContenedor = 300;
  juego.generateContenedorDeFichas(
      30,
      anchoContenedor,
      "../../assets/images/Juego/samid2.png",
      1
    );
    juego.generateContenedorDeFichas(
      widthCanvas - 265,
      anchoContenedor,
      "../../assets/images/Juego/viale3.png",
      2
    );
  juego.draw();
  canvas.addEventListener("mousedown", (e) => {
    juego.seleccionarFicha(e);
  });

  canvas.addEventListener("mouseup", (e) => {
    juego.soltarFicha(e);
  });

  canvas.addEventListener("mousemove", (e) => {
    juego.trasladarFicha(e);
  });
  document.querySelector(".formularioJuego").classList.add("ocultar");
}
*/