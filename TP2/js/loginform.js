"use strict";
document.querySelector('#btnLogin').addEventListener('click',realizarLogin);
let cargando = false;
let porcentajeCarga = document.querySelector(".porcentaje");
function realizarLogin(e){
    e.preventDefault();
    let email = document.querySelector("#email");
    let pass = document.querySelector('#password');
    let errorEmail = document.querySelector("#email_erroneo")
    let errorPass = document.querySelector("#pass_erroneo")
    if(!validarEmail(email.value) || pass.value === ""){
        if(validarEmail(email.value)){
            
            errorEmail.classList.add('ocultar');
        }else{
            errorEmail.classList.remove('ocultar');
            setTimeout( ()=>{
                errorEmail.classList.add('ocultar');
            },3000)
        }
        if(pass.value === "" ){ 
            errorPass.classList.remove('ocultar')
            setTimeout( () => {
                errorPass.classList.add('ocultar')
            },3000)
        }else{
            errorPass.classList.add('ocultar')
        }
    }else{
        cargando = true;
        empezarCargar();
        setTimeout(()=>{
            cargando = false
            window.location.href = "index.html";
            document.querySelector(".loader").classList.add('ocultar')
        },5000)
    }
}


function validarEmail(email) {
    // Expresión regular para validar un correo electrónico
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    // Utiliza la expresión regular para comprobar si el email es válido
    return regex.test(email);
  }


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
  