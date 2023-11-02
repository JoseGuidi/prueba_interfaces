class ContenedorFichas{
    constructor(posX,posY,alto,ancho,contexto,equipo,cantidadFichas,jugador){
        this.posX = posX
        this.posY = posY
        this.alto = alto
        this.ancho = ancho
        this.contexto = contexto
        this.fichas = [];
        this.jugador = jugador;
        
        for(let i = 0; i < cantidadFichas; i++){
            let posIn = {"x":posX,"y":posY + 50*i}

            let fic = new Ficha(posX,posY + 50*i,contexto,equipo,posIn,jugador)
            this.fichas.push(fic)
        }


    }
    draw(){
        this.contexto.fillStyle = "rgba(0,0,0,.5)"
        this.contexto.fillRect(this.posX,this.posY,heightCanvas/3,widthCanvas/2)
        
        this.fichas.forEach( e=>{
            e.draw()
        })
        
        
    }
    agregarFicha(f){
        this.fichas.push(f);
    }
    quitarFicha(f){
        this.fichas.filter( item => item != f)
    }
    seleccionarFicha(e){
        let clickX = e.offsetX;
        let clickY = e.offsetY;
        let resultado = null;
      
        this.fichas.forEach(e =>{
            if(e.clickedMe(clickX,clickY) && !e.getColocada()){
                resultado = e;
            } 
        })
        return resultado;
    }
    getFichas(){
        return this.fichas
    }

    getNumeroRandom(maximo){
        return Math.floor(Math.random()*maximo)
    }
}