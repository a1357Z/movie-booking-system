const Seat = require("./Seat")
module.exports = class CinemaHall{
    constructor(city, movie){
        this.city = city
        this.movie = movie
        this.seatCount = 20;
        this.seats = []

        //create seats for this hall
        for(let i=0;i<this.seatCount;i++){
            this.seats.push(new Seat(i, i));
        }
    }

    getMovie(){
        return this.movie;
    }

    getSeats(){
        return this.seats;
    }
}