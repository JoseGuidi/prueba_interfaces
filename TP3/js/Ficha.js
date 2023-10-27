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
    click(ac){
        this.clickeando = ac;
    }
    getClicked(){
        return this.clickeando
    }
    setNewPosition(x,y){
        this.x = x - this.imagen.width/2;
        this.y = y - this.imagen.height/2
    }
    getPosition(){
        return {"x":this.x,"y":this.y}
    }
    drawImage(){
        ctx.drawImage(this.imagen,this.x,this.y)

    }
}
