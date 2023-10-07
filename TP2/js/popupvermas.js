"use strict";
let btnVerMas = document.querySelector('#btnVerMas').addEventListener('click',visualizarVerMas);
let contenedorInfoExtra = document.querySelector('.informacion_extra');
let fondoConOpacidad = document.querySelector("#fondoOpacidad");
fondoConOpacidad.addEventListener('click',ocultarInfoExtra)
let btnCruzExtra = document.querySelector('.informacion_extra > div .cruzExtra').addEventListener('click',ocultarInfoExtra);

function visualizarVerMas(){
    contenedorInfoExtra.classList.remove('ocultar');
    fondoConOpacidad.classList.remove('ocultar');
    fondoConOpacidad.classList.add('mostrar')
}
function ocultarInfoExtra(){
    contenedorInfoExtra.classList.add('desaparecerConAnimacion')
    fondoConOpacidad.classList.add('ocultarConAnimacion');
    fondoConOpacidad.classList.remove('mostrar')
    setTimeout( ()=>{
        contenedorInfoExtra.classList.remove('desaparecerConAnimacion')
        contenedorInfoExtra.classList.add('ocultar');
        fondoConOpacidad.classList.remove('ocultarConAnimacion');
        fondoConOpacidad.classList.add('ocultar')
    },200)
}