class Juego{
    constructor(nEnLinea,ctx,tamanioFicha){
        this.nEnLinea = nEnLinea;
        this.columnas = nEnLinea+3;
        this.filas = nEnLinea+2;
        this.ctx = ctx;
        this.tamanioFicha = tamanioFicha;
        this.tablero = new Tablero(ctx,nEnLinea,tamanioFicha);
        this.turno = new Turno();
        
        this.jugadores = [];

        this.fichaClickeada = null;
        this.clickeando = false;
    }

    generateContenedorDeFichas(xInicial,yInicial,anchoContenedor,altoContenedor,srcImagenFicha,numeroJugador){
        // CREAR JUGADORES, UNICAMENTE INSTANCIAR 2 EN EL MAIN
        let cantidadFichasPorEquipo = this.columnas*this.filas/2
        let j = new ContenedorFichas(xInicial,yInicial,altoContenedor,anchoContenedor,this.ctx,srcImagenFicha,cantidadFichasPorEquipo,numeroJugador);
        this.jugadores.push(j);
    }

    draw(){
        // SERIA EL CLEAR CANVAS
        this.ctx.clearRect(0, 0, widthCanvas, heightCanvas);
        let imgFondo = new Image();
        imgFondo.src = imgBackGround;
        this.ctx.drawImage(imgFondo, 0, 0, widthCanvas, heightCanvas);
        this.tablero.draw();
        this.jugadores.forEach(j => {
            j.draw();
        });
    }

    seleccionarFicha(e){
        this.clickeando = true;
        if(this.fichaClickeada != null){
            this.fichaClickeada = null;
        }
        if(this.turno.getTurno() == 1){ //si es turno del jugador 1 
            this.fichaClickeada = this.jugadores[0].seleccionarFicha(e);
        }else{
            this.fichaClickeada = this.jugadores[1].seleccionarFicha(e);
        }
    }

    soltarFicha(e){
        this.draw(); // para hacer desaparecer la guia
        // Hay dos opciones, o la soltó en lugar permitido o no.
        if(this.lugarCorrectoParaLanzar(e.offsetX, e.offsetY) && this.fichaClickeada){
            // calculo columna
            let columna = this.calcularColumna(e.offsetX)
            // intento meterla en esa columna, la columna puede estar llena.
            let pudeInsertar = this.tablero.agregarFichaEn(columna, this.fichaClickeada); // tiene xey en caso de que se pueda insertar
            if(pudeInsertar != null){
                // Saco la ficha del jugador correspondiente
                this.fichaClickeada.setColocada(true)
                this.fichaClickeada.setPosition(pudeInsertar.x + 7,pudeInsertar.y+7)
                if(this.turno.getTurno() == 1){
                    this.jugadores[0].quitarFicha(this.fichaClickeada);
                    this.turno.changeTurno(2)
                }else{
                    this.jugadores[1].quitarFicha(this.fichaClickeada);
                    this.turno.changeTurno(1)
                }
                this.tablero.draw()
                let posicionesActuales = this.fichaClickeada.getPosition();
                this.animarFichaRegreso(this.fichaClickeada,posicionesActuales.x,posicionesActuales.y,e.offsetX-this.tamanioFicha,e.offsetY,this)
                console.log(this.fichaClickeada)
                //this.animarFichaRegreso(this.fichaClickeada,fichaClickeada.getPosition().x,fichaClickeada.getPosition().y,e.offsetX,e.offsetY,this)
            }else{
                // la devuelvo a su lugar
                let posInicialX = this.fichaClickeada.getPositionInicial().x;
                let posInicialY = this.fichaClickeada.getPositionInicial().y;
                this.animarFichaRegreso(this.fichaClickeada,posInicialX,posInicialY,e.offsetX,e.offsetY,this)
            }
        }else if(this.fichaClickeada){ // si hay ficha seleccionada, devolverla al origen.
            let posInicialX = this.fichaClickeada.getPositionInicial().x;
            let posInicialY = this.fichaClickeada.getPositionInicial().y;
            this.animarFichaRegreso(this.fichaClickeada,posInicialX,posInicialY,e.offsetX,e.offsetY,this)
        }
        this.draw()
        this.clickeando = false;
    }

    trasladarFicha(e){
        if (this.clickeando && this.fichaClickeada != null) {
            // cambio la posicion y dibujo todo de nuevo.
            let img = this.fichaClickeada.getImage();
            this.fichaClickeada.setPosition(
              e.offsetX - img.width / 2.5,
              e.offsetY - img.height / 2.5
            );
            this.draw();
            this.mostrarCirculosGuia();
            this.fichaClickeada.draw();
          }
    }




    /* FUNCIONES QUE AYUDAN */
    lugarCorrectoParaLanzar(x, y) {
        let xValido =(x > xInicialTablero && x < (this.columnas)*this.tamanioFicha*2+xInicialTablero)
        let yValido = (
            yInicialTablero - y - (1 / 2) * this.tamanioFicha <= this.tamanioFicha &&
            yInicialTablero > y
        );
        return xValido && yValido
    }

    animarFichaRegreso(ficha, initialX, initialY,targetX,targetY,juego) {
        // FUNCIONA, sin animacion
        /*ficha.setPosition(initialX,initialY);
        clearCanvas();*/
        
        const duration = 1000; // Duración de la animación en milisegundos
        const startTime = performance.now();
    
        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                const newX = targetX + (initialX - targetX) * progress;
                const newY = targetY + (initialY - targetY) * progress;
    
                ficha.setPosition(newX, newY);
                juego.draw();
    
                requestAnimationFrame(animate);
            } else {
                ficha.setPosition(initialX, initialY);
                juego.draw();
            }
        }
    
        requestAnimationFrame(animate); //función proporcionada por los navegadores web
    
    }

    calcularColumna(x) {
        // x es donde deje la ficha, siempre me quedo con la columna anterior si es que está en el medio
        let colum = Math.floor((x - xInicialTablero) / (this.tamanioFicha * 2));
        return colum;
    }

    mostrarCirculosGuia() {
        for (let i = 0; i < this.columnas; i++) {
          ctx.beginPath();
          ctx.arc(
            xInicialTablero + this.tamanioFicha + (this.tamanioFicha + 30) * i,
            yInicialTablero - 25,
            this.tamanioFicha / 1.5,
            0,
            2 * Math.PI
          );
          ctx.stroke();
          ctx.closePath;
        }
    }
}