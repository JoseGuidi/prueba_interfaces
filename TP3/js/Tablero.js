class Tablero{
    constructor(columnas,filas,ctx){
        this.ctx = ctx;
        this.fichas_samid = new Array();
        this.fichas_viale= new Array();
        this.columnas = columnas;
        this.filas = filas;
    }
    reiniciarTablero(){
        let c = this.columnas;
        let h = this.filas
        for(let i = 0; i < this.filas; i++){
            for(let j = 0; j < this.columnas;j++){
                
                let img = new Image();
                img.src = "../img/item_tablero.png";
                img.onload = function() {
                    //ctx.drawImage(img,50*i+0,50*j+100,50,50)
                    let a = 50*i + widthCanvas/2 - c*50/2;
                    let b = 50*j + heightCanvas/4 - h*50/2;
                    ctx.drawImage(img,a,b,50,50)
                } 
            }
        }
        
    }
    clearCanvas(){
        
    }
    mostrarFichas(){
        for(let i = 0; i < this.columnas*this.filas/2;i++){
            let i1 = new Image();
            i1.src = "../img/ficha_samid.png";
            let x = 50 + 5*getNumeroRandom(40);
            let y = heightCanvas/4-5*getNumeroRandom(30);
            this.fichas_samid.push(new Ficha(x,y,i1))
            let i2 = new Image();
            x = widthCanvas-300 + 5*getNumeroRandom(40);
            i2.src = "../img/ficha_viale.png";
            this.fichas_viale.push(new Ficha(x,y,i2))
        }
    }
    seleccionarFicha(e){
       
        let i = 0;
        let selecciono = false;
        while(!selecciono && i < this.fichas_samid.length){
            if(this.fichas_samid[i].clickedMe(e.layerX,e.layerY)){
                console.log("click")
                selecciono=true;
                this.fichas_samid[i].click(true);
            }
            i++;
        }
    }
    moverFicha(e){
        
        let i = 0;
        let selecciono = false;
        while(!selecciono && i < this.fichas_samid.length){
            if(this.fichas_samid[i].clickedMe(e.layerX,e.layerY) && this.fichas_samid[i].getClicked()){
                ctx.fillStyle = '#f5f5f5';
                ctx.fillRect(0,0,widthCanvas,heightCanvas)
                this.fichas_samid[i].setNewPosition(e.layerX,e.layerY)
                this.reiniciarTablero()
                for(let j = 0;j < this.fichas_samid.length;j++){
                    this.fichas_samid[j].setNewPosition(this.fichas_samid[j].getX(),this.fichas_samid[j].getY())
                }
            }
            i++;
        }
    }
    deseleccionarFicha(e){
        let i = 0;
        let selecciono = false;
        while(!selecciono && i < this.fichas_samid.length){
            if(this.fichas_samid[i].clickedMe(e.layerX,e.layerY)){
                this.fichas_samid[i].click(false)
                console.log("desclcik")
            }
            i++;
        }
    }

}
function getNumeroRandom(max) {
    return Math.round(Math.random()*max);
}