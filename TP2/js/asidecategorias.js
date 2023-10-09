"use strict";
let btnBurger = document.querySelector("#btnBurger").addEventListener("click",desplegarCategorias);
let fondo = document.querySelector("#fondoOpacidad");
let aside =  document.querySelector("aside.categorias");
let aAccion = document.querySelector('.categorias ul li a[href="#accion"]').addEventListener("click",(e)=>{e.preventDefault(); mostrarCarruselConAside('accion')});
let aAventura = document.querySelector('.categorias ul li a[href="#aventura"]').addEventListener("click",(e)=>{e.preventDefault(); mostrarCarruselConAside('aventura')});
let aRetro = document.querySelector('.categorias ul li a[href="#retro"]').addEventListener("click",(e)=>{e.preventDefault(); mostrarCarruselConAside('retro')});
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
function mostrarCarruselConAside(id){
    ocultarFondo()
    let section = document.querySelector("#"+id);
    if(section){
        section.scrollIntoView({behavior:"smooth"})
    }else{
        window.location.href = "home.html#"+id;
    }
    
}