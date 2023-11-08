class Caja{
    constructor(ctx,posX,posY,ancho,largo){
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY
        this.ancho = ancho;
        this.largo = largo
        this.img = new Image();
        this.img.src = "../../../../prueba_interfaces/TP3/assets/images/Juego/caja.png";
    }
    draw(){

            this.ctx.drawImage(this.img,this.posX,this.posY,this.ancho,this.largo)
        
    }
}