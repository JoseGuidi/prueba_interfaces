class Turno{
    constructor(){
        this.turnoActual = 1;
    }
    changeTurno(jugador){
        this.turnoActual = jugador;
    }
    getTurno(){
        return this.turnoActual;
    }
    getTurnoNombre(){
        if(this.turnoActual == 1){
            return "Viale"
        }else{
            return "Samid"
        }
    }
}