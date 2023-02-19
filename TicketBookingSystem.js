//dummy data

let movieData = [
    {
        name: "m0",
        id: 0
    },
    {
        name: "m1",
        id: 1
    },
    {
        name: "m2",
        id: 2
    },
    {
        name: "m3",
        id: 3
    }
]

let cityData = ["nagpur", "delhi", "mumbai"];


const City = require("./City")
const Movie = require("./Movie")
const CinemaHall = require("./CinemaHall");
const Ticket = require("./Ticket");
const Payment = require("./Payment")

module.exports = class System{
     constructor(){
        
        this.movies = [];
        this.cities = [];
        this.id = 0;
        
        //create cities
        for(let i=0;i<cityData.length;i++){
            let city = new City(cityData[i])
            this.cities.push(city);
        }

        // create the movies in the system
        for(let i=0;i<movieData.length; i++){
            const { name, id} = movieData[i];
            let movie = new Movie(name, id);
            this.movies.push(movie);
        }

        // add cinema halls to each city
        this.cities.forEach(city => {

            for(let i=0;i<this.movies.length; i++){
                let movie = this.movies[i];
                let hall = new CinemaHall(city, movie);
                city.addCinemaHall(hall);
            }
        
        })

     }

     //list down cities
     getAllCities(){
        return this.cities;
     }

     //return movies for a city
     getMovies(city){
        let halls = city.getCinemaHalls();
        return halls.map(hall => {
            return hall.getMovie()
        })
     }

     //halls for a movie and city
     getCinemaHalls(movie, city){
        const halls = city.getCinemaHalls();
        return halls.filter(hall => {
            return hall.getMovie() === movie
        })
     }

     //get a new ticket id
     getTicketId(){
        this.id += 1;
        return this.id;
     }

     //book ticket for a city, hall and a selected seat
     async bookTicket(hall, seat, user){
        if(!seat.isAvailable()){
            return { message: "seat not available"};
        }

        //create a ticket
        let ticket = new Ticket(this.getTicketId(), hall, user)

        //start the seat timer 
        seat.startTimer();
        
        // initiate payment
        let payment = new Payment(ticket);

        
        let status = await payment.getPaymentStatus();

        
        if(status === true && seat.getStatus() == 2){
            //payment successful and seat is on hold
            payment.succeedPayment();
            ticket.setStatus(1);
            seat.setStatus(1);
            return {"message" : "successfully booked ticket"}
        }else if(status === true && seat.getStatus() != 2){
            //payment successful and but time is over
            payment.failPayment();
            payment.initiateRefund();
            ticket.setStatus(2);
            return {"message" : "ticket failed"}
        }else if(status === false){
            // payment failed
            payment.failPayment();
            ticket.setStatus(2);
            if(seat.getStatus() == 2)seat.setStatus(0);
            return {"message" : "ticket failed"}
        }

     }




}