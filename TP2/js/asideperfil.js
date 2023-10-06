"use strict";
let btnPerfil = document.querySelector("#btnPerfil").addEventListener("click",desplegarMiPerfil);
let fondoOpaci = document.querySelector("#fondoOpacidad");
let asidePerfil =  document.querySelector("aside.contenedor_perfil");
fondoOpaci.addEventListener('click',ocultarfondoOpaci);
function desplegarMiPerfil(){
   asidePerfil.classList.remove('oculto');
   fondoOpaci.classList.remove('ocultar');
   fondoOpaci.classList.add('mostrar')
}
function ocultarfondoOpaci(){
    asidePerfil.classList.add('ocultoConAnimacion');
    fondoOpaci.classList.add('ocultarConAnimacion');
    fondoOpaci.classList.remove('mostrar')
    setTimeout( ()=>{
        
        asidePerfil.classList.remove('ocultoConAnimacion')
        asidePerfil.classList.add('oculto');
        fondoOpaci.classList.remove('ocultarConAnimacion');
        fondoOpaci.classList.add('ocultar')
    },200)
}