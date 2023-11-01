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
}