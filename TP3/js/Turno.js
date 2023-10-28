class Turno{
    constructor(){
        this.turnoActual = 2;
    }
    changeTurno(jugador){
        this.turnoActual = jugador;
    }
    getTurno(){
        return this.turnoActual;
    }
}