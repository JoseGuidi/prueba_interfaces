let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let widthCanvas = canvas.width;
let heightCanvas = canvas.height;

const xInicialTablero = 345; // posicion inicial del tablero eje X
const yInicialTablero = 195; // posicion inicial del tablero eje Y
const tamanioFicha = 30;
let imgViale = "../../assets/images/Juego/ficha_viale.png";
let imgSamid = "../../assets/images/Juego/ficha_samid.png";
const imgBackGround = "../../assets/images/Juego/fondoCanvas.jpg"





document.querySelector("#btnJugar").addEventListener("click",(e)=>{
    e.preventDefault();
    let modalidad = document.querySelectorAll('input[name="modalidad"]');
    let fichaViale = document.querySelectorAll('input[name="viale"]');
    let fichaSamid = document.querySelectorAll('input[name="samid"]');
    let vM;
    let vV;
    let vS;
    modalidad.forEach( (el)=>{
        if(el.checked){
            vM = el.value;
        }
    })

    fichaViale.forEach( (el)=>{
        if(el.checked){
            vV = el.value;
        }
    })

    fichaSamid.forEach( (el)=>{
        if(el.checked){
            vS = el.value;
        }
    })

    if(vM && vV && vS){
        let juego = new Juego(parseInt(vM),ctx,tamanioFicha);
        juego.generateContenedorDeFichas(45,80,widthCanvas/3,heightCanvas/2,"../../assets/images/Juego/"+vV,1);
        juego.generateContenedorDeFichas(widthCanvas - 270,80,widthCanvas/3,heightCanvas/2,"../../assets/images/Juego/"+vS,2);
        juego.draw()
        canvas.addEventListener("mousedown", (e) => {
            juego.seleccionarFicha(e);
        });
        
        canvas.addEventListener("mouseup", (e)=>{
            juego.soltarFicha(e);
        })
        
        canvas.addEventListener("mousemove", (e) => {
            juego.trasladarFicha(e);
        });
        document.querySelector(".formularioJuego").classList.add("ocultar")
    }else{
        
        document.querySelector(".formularioJuego form h1").classList.add("error")
    }
    
})