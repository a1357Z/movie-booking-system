/*
    status:
    0 --> processing
    1 --> booked
    2 --> failed
    */

    module.exports = class Ticket{
    constructor(id, cinemaHall, seats, user){
        this.id = id;
        this.cinemaHall = cinemaHall;
        this.seats = seats;
        this.user = user;
        this.status = 0;
    }

    setStatus(status){
        this.status = status
    }
}