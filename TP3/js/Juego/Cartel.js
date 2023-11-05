class Cartel{
    constructor(ctx,posX,posY,ancho){
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.mensaje = null;
        this.ancho = ancho;
        this.alto = 70;
    }
    setMensaje(m){
        this.mensaje = m;
    }
    draw(){
        if(this.mensaje){
            this.ctx.fillStyle = "#ffffffa7";
        this.ctx.fillRect(this.posX,0,this.ancho,this.alto)

        this.ctx.font="40px Helvetica";
        this.ctx.fillStyle = "#000"
        this.ctx.textAlign ="center";

        let anchoTexto = this.ctx.measureText(this.mensaje).width
        let centerX = this.posX + this.ancho / 2;; // Calcula la posición X centrada
        let centerY = this.alto / 2; // Ajusta esto según tus necesidades.
    
        this.ctx.fillText(this.mensaje, centerX, centerY);
        }
    }
}