class Juego{
    constructor(nEnLinea,ctx,tamanioFicha){
        this.nEnLinea = nEnLinea;
        this.columnas = nEnLinea+3;
        this.filas = nEnLinea+2;
        this.ctx = ctx;
        this.tamanioFicha = tamanioFicha;
        this.tablero = new Tablero(ctx,nEnLinea,tamanioFicha);
        this.turno = new Turno();
        this.terminoElJuego = false;
        this.jugadores = [];
        
        this.btnRestart = new ButtonRestart(widthCanvas-80,10,ctx)
        this.fichaClickeada = null;
        this.clickeando = false;
        this.xInicioTablero = widthCanvas/2 - this.columnas*tamanioFicha;
        this.yInicioTablero = heightCanvas/2 - this.filas*tamanioFicha;
        
        this.cartel = new Cartel(this.ctx,this.xInicioTablero,0,tamanioFicha*2*this.columnas);
        this.cronometros = new Cronometro(405,50,ctx,this)
        
    }

    generateContenedorDeFichas(xInicial,yInicial,imagen,nroJugador){
        // CREAR JUGADORES, UNICAMENTE INSTANCIAR 2 EN EL MAIN
        let cantidadFichas = this.columnas*this.filas/2
        let j = new ContenedorFichas(xInicial,yInicial,imagen,this.ctx,cantidadFichas,nroJugador)
        this.jugadores.push(j)
    }

    draw(){
        // SERIA EL CLEAR CANVAS
        this.ctx.clearRect(0, 0, 1080, 720);
        let imgFondo = new Image();
        imgFondo.src = imgBackGround;
        this.ctx.drawImage(imgFondo, 0, 0, widthCanvas +50, heightCanvas);
        this.tablero.draw();
        this.jugadores.forEach(j => {
            j.draw(this.turno);
        });
        this.btnRestart.draw()
        this.cartel.draw()
    }

    seleccionarFicha(e){
        if(!this.clickeoEnRestart(e)){
            this.clickeando = true;
            if(this.fichaClickeada != null){
                this.fichaClickeada = null;
            }
            if(this.turno.getTurno() == 1){ //si es turno del jugador 1 
                this.fichaClickeada = this.jugadores[0].seleccionarFicha(e);
            }else{
                this.fichaClickeada = this.jugadores[1].seleccionarFicha(e);
            }
            this.cronometros.draw()
        }else{
            //restar juego
            this.reiniciarJuego();
        }
    }

    soltarFicha(e){
        this.draw(); // para hacer desaparecer la guia
        // Hay dos opciones, o la soltó en lugar permitido o no.
        if(this.lugarCorrectoParaLanzar(e.offsetX, e.offsetY) && this.fichaClickeada){
            // calculo columna
            let columna = this.calcularColumna(e.offsetX)
            // intento meterla en esa columna, la columna puede estar llena.
            let pudeInsertar = this.tablero.agregarFichaEn(columna, this.fichaClickeada); 
            /*
                pudeInsertar devuelve JSON con Poscion de ultima ficha y el ganador (si es que alguien ganó)
                ó posicion (x,y) donde se inserto (si es que nadie gano tdv)
            */
            if(pudeInsertar.ganador){
                this.fichaClickeada.setColocada(true)
                this.fichaClickeada.setPosition(pudeInsertar.posicion.x + 7,pudeInsertar.posicion.y+7)
                let posicionesActuales = this.fichaClickeada.getPosition();
                this.animarFichaRegreso(this.fichaClickeada,posicionesActuales.x,posicionesActuales.y,e.offsetX-this.tamanioFicha,e.offsetY,this)
                this.terminoElJuego = true;
                setTimeout(()=>{
                    return this.terminarJuego(pudeInsertar.ganador);
                },1000)
            }else{
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
    
                    //this.animarFichaRegreso(this.fichaClickeada,fichaClickeada.getPosition().x,fichaClickeada.getPosition().y,e.offsetX,e.offsetY,this)
                }else{
                    // la devuelvo a su lugar
                    let posInicialX = this.fichaClickeada.getPositionInicial().x;
                    let posInicialY = this.fichaClickeada.getPositionInicial().y;
                    this.animarFichaRegreso(this.fichaClickeada,posInicialX,posInicialY,e.offsetX,e.offsetY,this)
                }
            }
        }else if(this.fichaClickeada){ // si hay ficha seleccionada, devolverla al origen.
            let posInicialX = this.fichaClickeada.getPositionInicial().x;
            let posInicialY = this.fichaClickeada.getPositionInicial().y;
            this.animarFichaRegreso(this.fichaClickeada,posInicialX,posInicialY,e.offsetX,e.offsetY,this)
        }
        this.draw()
        this.cronometros.draw()
        this.clickeando = false;
        this.fichaClickeada = null;
        return this.terminoElJuego;
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
            this.cronometros.draw()
          }
    }
    devolverFicha(e){
        if(this.fichaClickeada){
            let posInicialX = this.fichaClickeada.getPositionInicial().x;
            let posInicialY = this.fichaClickeada.getPositionInicial().y;
           
            this.animarFichaRegreso(this.fichaClickeada,posInicialX,posInicialY,e.offsetX,e.offsetY,this)
            this.fichaClickeada = null;
        }
    }


    /* FUNCIONES QUE AYUDAN */
    lugarCorrectoParaLanzar(x, y) {
        let xValido =(x > this.xInicioTablero && x < (this.columnas)*this.tamanioFicha*2+this.xInicioTablero)
        let yValido = (
            this.yInicioTablero - y - (1 / 2) * this.tamanioFicha <= this.tamanioFicha &&
            this.yInicioTablero > y
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
        let colum = Math.floor((x - this.xInicioTablero) / (this.tamanioFicha * 2));
        return colum;
    }

    mostrarCirculosGuia() {
         for (let i = 0; i < this.columnas; i++) {
          ctx.beginPath();
          /*
          ctx.arc(
            xInicialTablero + this.tamanioFicha + (this.tamanioFicha + 30) * i,
            yInicialTablero - 25,
            this.tamanioFicha / 1.5,
            0,
            2 * Math.PI
          );*/
          
          ctx.arc(
            this.xInicioTablero + (this.tamanioFicha*2) * i + this.tamanioFicha,
           this.yInicioTablero - this.tamanioFicha,
            this.tamanioFicha / 1.5,
            0,
            2 * Math.PI
          );
          ctx.stroke();
          this.ctx.fillStyle="#00000020"
          this.ctx.fill()
          ctx.closePath;
        }
    }
    getTurno(){
        return this.turno.getTurno();
    }
    getTurnoNombre(){
        return this.turno.getTurnoNombre()
    }
    terminarJuego(resultado){
        this.ctx.clearRect(0, 0, widthCanvas, heightCanvas);
        let imgFondo = new Image();
        imgFondo.src = imgBackGround;
        this.ctx.drawImage(imgFondo, 0, 0, widthCanvas, heightCanvas);
        this.tablero.draw()
        this.cronometros.terminarJuego(); 
        this.jugadores.forEach(c=>{
            c.bloquearFichas()
        })

        this.ctx.fill
        if(resultado == 0){
            //empate
            this.cartel.setMensaje("Empate");
            return 0;
        }else if(resultado == 1){
            // gano 1
            this.cartel.setMensaje("Ganó Samid");
            return 1;
        }else{
            // gano 2
            this.cartel.setMensaje("Ganó Viale");
            return 2;
        }
    }
    empatarJuego(){
        this.cronometros.terminarJuego(); 
        this.jugadores.forEach(c=>{
            c.bloquearFichas()
        })
        this.cartel.setMensaje("Empate")
        this.draw()
    }
    clickeoEnRestart(e){
        return this.btnRestart.meClickeo(e.offsetX,e.offsetY);
    }
    reiniciarJuego(){
        this.tablero = new Tablero(this.ctx,this.nEnLinea,tamanioFicha)
        this.turno = new Turno();
        this.cronometros.juego = null;
        this.cronometros = new Cronometro(405,50,ctx,this)
        let aux = this.jugadores;
        this.jugadores = [];
        aux.forEach( j =>{
            let cantidadFichas = this.columnas*this.filas/2
            j = new ContenedorFichas(j.getPosition().x,j.getPosition().y,j.getImage(),this.ctx,cantidadFichas,j.getJugador())
            this.jugadores.push(j)
        })
        aux = null;
        this.cartel.setMensaje(null)
    }
}