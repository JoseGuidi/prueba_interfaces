class Tablero{
    constructor(columnas,filas,ctx){
        this.ctx = ctx;
        this.fichas_samid = new Array();
        this.fichas_viale= new Array();
        this.columnas = columnas;
        this.filas = filas;
        this.fichaSeleccionada = null;
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
    imprimirImagenes(){
        for(let i = 0; i< this.fichas_samid.length;i++){
            this.fichas_samid[i].drawImage();
            this.fichas_viale[i].drawImage();
        }
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
        while(i < this.fichas_samid.length){
            if(this.fichas_samid[i].clickedMe(e.offsetX,e.offsetY)){
                this.fichaSeleccionada = this.fichas_samid[i]
                this.fichas_samid[i].click(true);
                this.fichas_samid[i].setNewPosition(e.offsetX,e.offsetY)
            }
            if(this.fichas_viale[i].clickedMe(e.offsetX,e.offsetY)){
                this.fichas_viale[i].setNewPosition(e.offsetX,e.offsetY)
                this.fichaSeleccionada = this.fichas_viale[i]
                this.fichas_viale[i].click(true);
            }
            i++;
        }
    }
    moverFicha(e){
        if(this.fichaSeleccionada != null){
            this.fichaSeleccionada.setNewPosition(e.offsetX,e.offsetY)
            this.clearCanvas()
    
        }
        
    }
    deseleccionarFicha(e){
        if(this.fichaSeleccionada != null){
            this.fichaSeleccionada = null;
        }
    }
    clearCanvas(){
        ctx.fillStyle ="#f5f5f5";
        ctx.fillRect(0,0,widthCanvas,heightCanvas)
        this.reiniciarTablero();
        this.imprimirImagenes()
    }
}
function getNumeroRandom(max) {
    return Math.round(Math.random()*max);
}