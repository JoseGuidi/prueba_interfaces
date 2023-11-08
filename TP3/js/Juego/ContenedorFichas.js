class ContenedorFichas{
    constructor(posX,posY,equipo,contexto,cantidadFichas,jugador){
        this.posY = posY
        this.posX = posX
        this.contexto = contexto
        this.fichas = [];
        this.equipo = equipo;
        this.jugador = jugador;
        for(let i = 0; i < cantidadFichas; i++){
            let minimoX = posX + 60;
            let maximoX = posX + 105;
            let mininmoY = posY + 80
            let maximoY = posY - 160
            if(jugador == 2){
                maximoX = 105
            }
            let posIn = {"x":this.getNumeroRandom(minimoX,maximoX),"y":this.getNumeroRandom(mininmoY,maximoY)}
            let fic = new Ficha(posIn.x,posIn.y,contexto,equipo,posIn,jugador)
            this.fichas.push(fic)
            
        }
        this.caja = new Caja(ctx,posX,posY,230,330);
        
        this.flechaTurno = new Image();
        this.flechaTurno.src = "../../../../pruebas_interfaces/TP3/assets/images/Juego/flecha.png"

    }
    draw(turno){
        /*this.contexto.fillStyle = "rgba(0,0,0,.5)"
        this.contexto.fillRect(this.posX,this.posY,this.ancho,this.alto)*/
       
        this.caja.draw()
        this.contexto.fillStyle ="#ffffffa7"
        this.contexto.fillRect(this.posX + 46,this.posY-35,140,33)
        this.contexto.textAlign ="start"
        this.contexto.font="30px Arial";
        this.contexto.fillStyle = "#000"
        let texto;
        if(turno.getTurno() == this.jugador){
            this.contexto.drawImage(this.flechaTurno,this.posX+230/2-35,this.posY - 120,70,80);
        }
        this.contexto.fillText("Jugador " + this.jugador,this.posX + 50,this.posY - 10)

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
    getPosition(){
        return {"x":this.posX,"y":this.posY}
    }
    getNumeroRandom(inicio,maximo){
        return inicio + Math.floor(Math.random()*maximo - tamanioFicha)
    }
    getImage(){
        return this.equipo;
    }
    getJugador(){
        return this.jugador;
    }
    bloquearFichas(){
        this.fichas.forEach( f=>{
            f.setColocada(true)
        })
    }
}