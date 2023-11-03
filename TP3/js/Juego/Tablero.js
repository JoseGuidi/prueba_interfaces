class Tablero{
    constructor(contexto,cantidadEnLinea,tamanioFicha){
        this.ctx = contexto;
       
        this.cantidadEnLinea = cantidadEnLinea;
        this.tamFicha = tamanioFicha;
        this.cantFilas = cantidadEnLinea+2;
        this.cantColumnas = cantidadEnLinea+3;
        this.casillas = [];
        this.tamañoCasilla ={"largo":tamanioFicha*2,"ancho":tamanioFicha*2}
        for (let i = 0; i < this.cantFilas; i++) {
            this.casillas[i] = [];
            for (let j = 0; j < this.cantColumnas; j++) {
                let x = j*this.tamañoCasilla.ancho + (widthCanvas/2 - this.cantColumnas*tamanioFicha)
                let y = i*this.tamañoCasilla.largo + (heightCanvas/2 - this.cantFilas*tamanioFicha)
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
        let resultado;
        
        for(let j = this.cantFilas-1; j >= 0  ;j--){
        
            if(this.casillas[j][col].getFicha() == undefined && posicionCasillero == null){
                
                this.casillas[j][col].setFicha(ficha);
                posicionCasillero = this.casillas[j][col].getPosition();
                
                //this.casillas[j][col].getFicha().setPosition(posicionCasillero.x,posicionCasillero.y)
                resultado = this.chequearGanador(ficha,j,col);
                if(resultado){
                    resultado ={
                        "posicion":posicionCasillero,
                        "ganador":resultado
                    }
                    return resultado;
                }
            }
        }
        
        return posicionCasillero
    }
    recuperarCantFichasIzquierda(i,j,ficha){
        let secuencia=true;;
        let cantidad=0;
        j--;
        
        while((j>=0)&&(secuencia)){
            if((this.casillas[i][j].getFicha()!=null)&&(this.casillas[i][j].getFicha().getJugador()==ficha.getJugador())){
                cantidad++;
                j--;
            }else{
                secuencia=false;
            }
        }
        return cantidad;
    }
    recuperarCantFichasDerecha(i,j,ficha){
        let secuencia=true;;
        let cantidad=0;
        j++;
        
        while((j<this.cantColumnas)&&(secuencia)){
            if((this.casillas[i][j].getFicha()!=null)&&(this.casillas[i][j].getFicha().getJugador()==ficha.getJugador())){
                cantidad++;
                j++;
            }else{
                secuencia=false;
            }
        }
        return cantidad;
    }
    recuperarCantFichasDiagonalArribaIzquierda(fila,col,ficha){
        let secuencia=true;;
        let cantidad=0;
        fila--;
        col--;
        while(fila>=0&&col>=0&&secuencia){
            if((this.casillas[fila][col].getFicha()!=null)&&(this.casillas[fila][col].getFicha().getJugador()==ficha.getJugador())){
                cantidad++;
                fila--;
                col--;

            }else{
                secuencia=false;
            }
        }
        return cantidad;
    }
    recuperarCantFichasDiagonalArribaDerecha(fila,col,ficha){
        let secuencia=true;;
        let cantidad=0;
        fila--;
        col++;
        while(fila>=0&&col<this.cantColumnas&&secuencia){
            if((this.casillas[fila][col].getFicha()!=null)&&(this.casillas[fila][col].getFicha().getJugador()==ficha.getJugador())){
                cantidad++;
                fila--;
                col++;

            }else{
                secuencia=false;
            }
        }
        return cantidad;
    }
    recuperarCantFichasDiagonalAbajoDerecha(fila,col,ficha){
        let secuencia=true;;
        let cantidad=0;
        fila++;
        col++;
        while(fila<this.cantFilas&&col<this.cantColumnas&&secuencia){
            if((this.casillas[fila][col].getFicha()!=null)&&(this.casillas[fila][col].getFicha().getJugador()==ficha.getJugador())){
                cantidad++;
                fila++;
                col++;

            }else{
                secuencia=false;
            }
        }
        return cantidad;
    }
    recuperarCantFichasDiagonalAbajoIzquierda(fila,col,ficha){
        let secuencia=true;;
        let cantidad=0;
        fila++;
        col--;
        while(fila<this.cantFilas&&col>=0&&secuencia){
            if((this.casillas[fila][col].getFicha()!=null)&&(this.casillas[fila][col].getFicha().getJugador()==ficha.getJugador())){
                cantidad++;
                fila++;
                col--;

            }else{
                secuencia=false;
            }
        }
        return cantidad;
    }
    recuperarCantFichasArriba(i,j,ficha){
        i++;
        let secuencia=true;
        let cantidad=0;
        while((i<this.cantFilas)&&(secuencia)){
            if((this.casillas[i][j].getFicha()!=null)&&(this.casillas[i][j].getFicha().getJugador()==ficha.getJugador())){
                cantidad++;
                i++;
                
            }else{
                secuencia=false;
            }
        }
        return cantidad;
    }
    chequearGanador(ficha,fila,columna){
        let cantidad=1;
        let i=fila;
        let j=columna;
        let ganador=null;
        cantidad+=this.recuperarCantFichasArriba(i,j,ficha)
        if(cantidad>=this.cantidadEnLinea){
            ganador=ficha.getJugador();
        }
        if(ganador==null){
            cantidad=1;
            i=fila;
            cantidad+=this.recuperarCantFichasIzquierda(i,j,ficha);
            cantidad+=this.recuperarCantFichasDerecha(i,j,ficha);
            if(cantidad>=this.cantidadEnLinea)
                ganador=ficha.getJugador();
        }
        if(ganador==null){
            cantidad=1;
            j=columna;
            i=fila;
            cantidad+=this.recuperarCantFichasDiagonalArribaIzquierda(i,j,ficha);
            cantidad+=this.recuperarCantFichasDiagonalAbajoDerecha(i,j,ficha);
            if(cantidad>=this.cantidadEnLinea)
                ganador=ficha.getJugador();
        }
        if(ganador==null){
            cantidad=1;
            j=columna;
            i=fila;
            cantidad+=this.recuperarCantFichasDiagonalArribaDerecha(i,j,ficha);
            cantidad+=this.recuperarCantFichasDiagonalAbajoIzquierda(i,j,ficha);
            if(cantidad>=this.cantidadEnLinea)
                ganador=ficha.getJugador();
        }
       
        return ganador;
    }
    
        
  
}