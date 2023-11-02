document.addEventListener("DOMContentLoaded", function() {
    let cargando = false;
    let porcentajeCarga = document.querySelector(".porcentaje");
    cargando = true
    empezarCargar()
    setTimeout(()=>{
        cargando = false;
        document.querySelector(".loader").classList.add("ocultar");
    },5000)   

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
});

