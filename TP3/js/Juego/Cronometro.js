class Cronometro{
    constructor(posX,posY,ctx,juego){
        this.minutos = 5;
        this.segundos = 0;
        this.juego = juego;
        this.posX = posX
        this.posY = posY
        this.ctx = ctx
        this.actualizarTemporizador = this.actualizarTemporizador.bind(this);
        this.terminoJuego = false;

        this.actualizarTemporizador();
    }
    draw(){
        if(!this.terminoJuego){
            this.ctx.fillStyle = "#eab676"
            this.ctx.fillRect(455,0,200,60)
            this.ctx.font="60px Helvetica";
            this.ctx.textAlign ="start"
            this.ctx.fillStyle = "#000"
            let minutosConCero = this.minutos < 10 ? '0' + this.minutos : this.minutos;
            
            let segundosConCero = this.segundos < 10 ? '0' + this.segundos : this.segundos;

            let time = minutosConCero+":"+segundosConCero
            let anchoTexto = this.ctx.measureText(time).width/2
            this.ctx.fillText(time,this.posX+anchoTexto,this.posY)
           /* let turno ="Turno de " + this.juego.getTurnoNombre();
            this.ctx.font="35px Helvetica";
            this.ctx.fillStyle = "#000000"
            anchoTexto = this.ctx.measureText(turno).width/2
            this.ctx.fillText(turno,this.posX,this.posY+50)*/
        }
    }
    actualizarTemporizador(){
        if(this.juego){
            this.juego.draw()
        if (this.minutos === 0 && this.segundos === 0) {
            this.juego.empatarJuego();
        }else{
            if (this.segundos === 0) {
                this.minutos--;
                this.segundos = 59;
            } else {
                this.segundos--;
            }
            setTimeout(this.actualizarTemporizador, 1000);
        }
        this.draw()
        }
    }
    terminarJuego(){
        this.terminoJuego = true;
    }
}