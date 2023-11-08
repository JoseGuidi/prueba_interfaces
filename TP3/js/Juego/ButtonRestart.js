class ButtonRestart{
    constructor(x,y,ctx){
        this.posX = x;
        this.posY = y;
        this.img = new Image()
        this.img.src = "../../TP3/assets/images/Juego/restart.png"
        this.ctx = ctx;
    }
    draw(){
        this.ctx.drawImage(this.img,this.posX,this.posY,40,40)
    }
    meClickeo(x,y){
        let enEjeX = x > this.posX && x < this.posX+40;
        let enEjeY = y > this.posY && y < this.posY +40;
        
        return enEjeX&&enEjeY
    }
}