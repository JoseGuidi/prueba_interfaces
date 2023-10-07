"use strict";
let btnCompartir = document.querySelector('#btnCompartir').addEventListener('click',visualizarCompartir);
let contenedorCompartir = document.querySelector('.compartirRedes');
let fondoOpacidad = document.querySelector("#fondoOpacidad");
let btnCruz = document.querySelector('.compartirRedes > div .cruz').addEventListener('click',desaparecerCompartir);
fondoOpacidad.addEventListener('click',desaparecerCompartir)
function visualizarCompartir(){
    contenedorCompartir.classList.remove('ocultar');
    fondoOpacidad.classList.remove('ocultar');
    fondoOpacidad.classList.add('mostrar')
}
function desaparecerCompartir(){
    contenedorCompartir.classList.add('desaparecerConAnimacion')
    fondoOpacidad.classList.add('ocultarConAnimacion');
    fondoOpacidad.classList.remove('mostrar')
    setTimeout( ()=>{
        contenedorCompartir.classList.remove('desaparecerConAnimacion')
        contenedorCompartir.classList.add('ocultar');
        fondoOpacidad.classList.remove('ocultarConAnimacion');
        fondoOpacidad.classList.add('ocultar')
    },200)
}