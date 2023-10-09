"use strict";
let btnCompartir = document.querySelector('#btnCompartir').addEventListener('click',visualizarCompartir);
let contenedorCompartir = document.querySelector('.compartirRedes');
let fondoConOpacidadCompartir = document.querySelector("#fondoOpacidad");
let btnCruz = document.querySelector('.compartirRedes > div .cruz').addEventListener('click',desaparecerCompartir);
fondoConOpacidadCompartir.addEventListener('click',desaparecerCompartir)
function visualizarCompartir(){
    contenedorCompartir.classList.remove('ocultar');
    fondoConOpacidadCompartir.classList.remove('ocultar');
    fondoConOpacidadCompartir.classList.add('mostrar')
}
function desaparecerCompartir(){
    contenedorCompartir.classList.add('desaparecerConAnimacion')
    fondoConOpacidadCompartir.classList.add('ocultarConAnimacion');
    fondoConOpacidadCompartir.classList.remove('mostrar')
    setTimeout( ()=>{
        contenedorCompartir.classList.remove('desaparecerConAnimacion')
        contenedorCompartir.classList.add('ocultar');
        fondoConOpacidadCompartir.classList.remove('ocultarConAnimacion');
        fondoConOpacidadCompartir.classList.add('ocultar')
    },200)
}