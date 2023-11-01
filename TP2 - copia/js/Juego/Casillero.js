class Casillero{
    constructor(context,posX,posY,tamficha){
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.tamFicha = tamficha
        //this.ficha = new Ficha(posX,posY,context,"../img/ficha_samid.png",{"x":posX,"y":posY});
        this.ficha = null
    }

    draw(){
        this.context.fillStyle = "#0e105b"
        this.context.fillRect(this.posX,this.posY,this.tamFicha*2,this.tamFicha*2)
        let centroY = this.posY + this.tamFicha
        let centroX = this.posX + this.tamFicha
        
            this.context.beginPath();
            this.context.arc(centroX, centroY, this.tamFicha*0.8, 0, Math.PI * 2);
            this.context.fillStyle = "#f5f5f5"
            this.context.fill();
        
    }
    setFicha(ficha){
        this.ficha = ficha;
    }
    getFicha(){
        return this.ficha;
    }
    getPosition(){
        return {"x":this.posX,"y":this.posY}
    }
}