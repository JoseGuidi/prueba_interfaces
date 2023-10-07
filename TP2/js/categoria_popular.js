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



