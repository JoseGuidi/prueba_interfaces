class Ficha{
    constructor(posX, posY, contexto, imageSrc,posInicial) {
        this.posInicial = posInicial
        this.posX = posX
        this.posY = posY
        this.contexto = contexto;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }
    getPosition(){
        return {"x":this.posX,"y":this.posY}
    }
    getImage(){
        return this.image;
    }
    draw(){
        if(this.image.complete){ //ya se cargo 
            this.contexto.imageSmoothingEnabled = true;
            this.contexto.drawImage(this.image, this.posX, this.posY,45,45);
        }else{
            this.image.onload = () =>{
                this.contexto.imageSmoothingEnabled = true;
                this.contexto.drawImage(this.image, this.posX, this.posY,45,45);
            }
        }
    }
    clickedMe(x,y){
        let inX = x > this.posX && x < this.posX + this.image.width
        let inY = y > this.posY && y < this.posY + this.image.height
        return inX && inY
    }
}
