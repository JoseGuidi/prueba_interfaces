class Tablero{
    constructor(contexto,cantidadEnLinea,tamanioFicha){
        this.ctx = contexto;
        this.cant = cantidadEnLinea;
        this.tamFicha = tamanioFicha;
        this.cantFilas = cantidadEnLinea +2;
        this.cantColumnas = cantidadEnLinea +3;
        this.casillas = [];
        this.tamañoCasilla ={"largo":tamanioFicha*2,"ancho":tamanioFicha*2}


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
    draw(){
        for (let i = 0; i < this.cantFilas; i++) {
            for (let j = 0; j < this.cantColumnas; j++) {
                
                this.casillas[i][j].draw();
            }
        }

    }
    agregarFichaEn(col,ficha){
        // Retorna la f y c si se pudo agregar o null si no;
        let posicionCasillero = null;
        for(let j = this.cantFilas-1; j >= 0  ;j--){
        
            if(this.casillas[j][col].getFicha() == null && posicionCasillero == null){
                
                this.casillas[j][col].setFicha(ficha);
                posicionCasillero = this.casillas[j][col].getPosition();
                //this.casillas[j][col].getFicha().setPosition(posicionCasillero.x,posicionCasillero.y)
                this.chequearGanador();
            }
        }
        return posicionCasillero
    }
    chequearGanador(){

    }
  
}