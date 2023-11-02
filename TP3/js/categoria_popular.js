const fichitas = document.querySelectorAll('.categoria_popular');
let girando=false;
fichitas.forEach(ficha => {
    ficha.addEventListener('mouseenter', () => {
        if(!girando){
            ficha.classList.add('rotacion');
            girando=true;
        }
        setTimeout(() => {
            ficha.classList.remove('rotacion');
            girando=false;
        }, 2000);
        
    });
});

let cAventura = document.querySelector(".categoria_popular.aventura").addEventListener("click",()=>{mostrarCarrusel("aventura")})
let cpuzzle = document.querySelector(".categoria_popular.puzzle").addEventListener("click",()=>{mostrarCarrusel("puzzle")})
let caccion = document.querySelector(".categoria_popular.accion").addEventListener("click",()=>{mostrarCarrusel("accion")})
let cretro = document.querySelector(".categoria_popular.retro").addEventListener("click",()=>{mostrarCarrusel("retro")})
let ctendencia = document.querySelector(".categoria_popular.tendencia").addEventListener("click",()=>{mostrarCarrusel("tendencia")})


function mostrarCarrusel(id){
    document.querySelector("#"+id).scrollIntoView({behavior:"smooth"})
    
}