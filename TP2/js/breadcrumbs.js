"use strict";
let cargando = false;
let porcentajeCarga = document.querySelector(".porcentaje");
let aGaleria = document.querySelector("#anchorGaleria").addEventListener("click",redirigirGaleria);
let aTendencia = document.querySelector("#anchorCategoriaTendencia").addEventListener("click",redirigirTendencia);

function redirigirGaleria(){
    cargando = true
    empezarCargar()
    setTimeout(()=>{
        cargando = false;
        document.querySelector(".loader").classList.add("ocultar");
        window.location.href = "index.html";
    },5000)
}
function redirigirTendencia(){
    cargando = true
    empezarCargar()
    setTimeout(()=>{
        cargando = false;
        document.querySelector(".loader").classList.add("ocultar");
        window.location.href = "index.html#tendencia";
    },5000)
}

function empezarCargar() {
    document.querySelector(".loader").classList.remove("ocultar");
    let contador = 0;
    let intervalo = setInterval(() => {
      contador++;
      porcentajeCarga.innerHTML = contador + "%";
      if (contador > 70) {
        clearInterval(intervalo);
      }
    }, 25);
    let intervalo2 = setInterval(() => {
      contador++;
      porcentajeCarga.innerHTML = contador + "%";
      if (contador > 99) {
        clearInterval(intervalo2);
      }
    }, 75);
  }