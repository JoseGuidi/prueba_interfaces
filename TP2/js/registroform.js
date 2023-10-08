"use strict";
let btnRegistro = document
  .querySelector("#btnRegistro")
  .addEventListener("click", registrar);
let iNombre = document.querySelector("#iNombre");
let iUsuario = document.querySelector("#iUsuario");
let iApellido = document.querySelector("#iApellido");
let iPassword = document.querySelector("#iPassword");
let iEmail = document.querySelector("#iEmail");
let iFecha = document.querySelector("#iFecha");
let cargando = false;
let porcentajeCarga = document.querySelector(".porcentaje");
function registrar(e) {
  e.preventDefault();
  if (inputsValidos()) {
    document.querySelector('.contenedor_tilde').classList.remove('ocultar')
    setTimeout(()=>{
      cargando = true;
      empezarCargar();
      setTimeout(() => {
        cargando = false;
        document.querySelector(".loader").classList.add("ocultar");
        window.location.href = "index.html";
      }, 5000);
    },2000)
  }else{

  }
}

function inputsValidos() {
  let todos = true;
  if (iNombre.value === "") {
    aparecerMensaje("nombre_error", "Campo requerido");
    todos = false;
  } else {
    ocultarError("nombre_error");
  }

  if (iApellido.value === "") {
    aparecerMensaje("apellido_error", "Campo requerido");
    todos = false;
  } else {
    ocultarError("apellido_error");
  }
  if (iEmail.value === "") {
    aparecerMensaje("email_error", "Campo requerido");
    todos = false;
  } else if (!validarEmail(iEmail.value)) {
    aparecerMensaje("email_error", "Correo invalido");
    todos = false;
  } else {
    ocultarError("email_error");
  }

  if (iFecha.value === "") {
    aparecerMensaje("fecha_error", "Campo requerido");
    todos = false;
  } else {
    ocultarError("fecha_error");
  }

  if (iPassword.value === "") {
    aparecerMensaje("pass_error", "Campo requerido");
    todos = false;
  } else {
    ocultarError("pass_error");
  }
  return todos;
}

function aparecerMensaje(id, mensaje) {
  let contenedor = document.querySelector("#" + id);
  document.querySelector("#" + id + " span").innerHTML = mensaje;
  contenedor.classList.remove("ocultar");
  setTimeout(() => {
    contenedor.classList.add("ocultar");
  }, 3000);
}
function ocultarError(id) {
  let contenedor = document.querySelector("#" + id);
  contenedor.classList.add("ocultar");
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
