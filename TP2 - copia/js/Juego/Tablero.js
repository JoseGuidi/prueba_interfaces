class Tablero{
    constructor(contexto,cantidadEnLinea,tamanioFicha){
        this.ctx = contexto;
        this.cant = cantidadEnLinea;
        this.tamFicha = tamanioFicha;
        this.cantFilas = cantidadEnLinea +2;
        this.cantColumnas = cantidadEnLinea +3;
        this.casillas = [];
        this.tamañoCasilla ={"largo":tamanioFicha*2,"ancho":tamanioFicha*2}
    }
    draw(){
        for (let i = 0; i < this.cantFilas; i++) {
            this.casillas[i] = [];
            for (let j = 0; j < this.cantColumnas; j++) {
                let x = j*this.tamañoCasilla.ancho + xInicialTablero
                let y = i*this.tamañoCasilla.largo + yInicialTablero
                this.casillas[i][j] = new Casillero(this.ctx,x,y,this.tamFicha);
                this.casillas[i][j].draw();
            }
        }

    }
    agregarFichaEn(col,ficha){
        // Si hay lugar en la columna, es decir mientras el casillero sea null 
        let resultado = false;
        for(let j = 0; j < this.cantFilas;j++){
            
            if(this.casillas[j][col] != null){
                resultado = true;
                //no funciona
               // this.casillas[j][col].setFicha(ficha);
                this.chequearGanador();
            }
        }
        return resultado
    }
    chequearGanador(){

    }
  
}