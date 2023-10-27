class Ficha{
    constructor(x,y,img){
        this.x = x;
        this.y = y;
        img.onload = function(){
            ctx.drawImage(img,x,y)
        }
        this.imagen = img
        this.clickeando = false;
        
    }

    clickedMe(posx,posy){
        /*if(posy > this.y && posy < this.imagen.height && posx > this.x && posx < this.imagen.width){
            console.log("hola")
        }*/
        if(posy > this.y && posy < this.y + this.imagen.height &&
            posx > this.x && posx < this.x+this.imagen.width){
            return true;
        }else{return false;}
        
    }
    setY(y){
        this.y = y;
    }
    setX(x){
        this.x = x;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    click(ac){
        this.clickeando = ac;
    }
    getClicked(){
        return this.clickeando
    }
    setNewPosition(x,y){
        ctx.drawImage(this.imagen,x,y)
    }
}
