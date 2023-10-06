"use strict";
let btnBurger = document.querySelector("#btnBurger").addEventListener("click",desplegarCategorias);
let fondo = document.querySelector("#fondoOpacidad");
let aside =  document.querySelector("aside.categorias");
fondo.addEventListener('click',ocultarFondo);
function desplegarCategorias(){
    aside.classList.remove('oculto')
    fondo.classList.add('mostrar');
    fondo.classList.remove('ocultar');
}
function ocultarFondo(){
    aside.classList.add('ocultoConAnimacion');
    fondo.classList.add('ocultarConAnimacion');
    fondo.classList.remove('mostrar')
    setTimeout( ()=>{
        aside.classList.remove('ocultoConAnimacion')
        aside.classList.add('oculto');
        fondo.classList.remove('ocultarConAnimacion');
        fondo.classList.add('ocultar')
    },200)
}