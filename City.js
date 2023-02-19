module.exports = class City{
    constructor(name){
        this.name = name;
        this.cinemaHalls = []
    }

    addCinemaHall(hall){    
        this.cinemaHalls.push(hall);
    }

    getName(){
        return this.name;
    }

    getCinemaHalls(){
        return this.cinemaHalls
    }
}