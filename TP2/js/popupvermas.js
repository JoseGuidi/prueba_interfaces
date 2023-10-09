"use strict";
let btnVerMas = document.querySelector('#btnVerMas').addEventListener('click',visualizarVerMas);
let contenedorInfoExtra = document.querySelector('.informacion_extra');
let fondoConOpacidadVerMas = document.querySelector("#fondoOpacidad");
fondoConOpacidadVerMas.addEventListener('click',ocultarInfoExtra)
let btnCruzExtra = document.querySelector('.informacion_extra > div .cruzExtra').addEventListener('click',ocultarInfoExtra);

function visualizarVerMas(){
    contenedorInfoExtra.classList.remove('ocultar');
    fondoConOpacidadVerMas.classList.remove('ocultar');
    fondoConOpacidadVerMas.classList.add('mostrar')
}
function ocultarInfoExtra(){
    contenedorInfoExtra.classList.add('desaparecerConAnimacion')
    fondoConOpacidadVerMas.classList.add('ocultarConAnimacion');
    fondoConOpacidadVerMas.classList.remove('mostrar')
    setTimeout( ()=>{
        contenedorInfoExtra.classList.remove('desaparecerConAnimacion')
        contenedorInfoExtra.classList.add('ocultar');
        fondoConOpacidadVerMas.classList.remove('ocultarConAnimacion');
        fondoConOpacidadVerMas.classList.add('ocultar')
    },200)
}