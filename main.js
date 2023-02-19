const System = require("./TicketBookingSystem")
const User = require("./User")



let user1 = new User("ajay", 0);
let system = new System();

//list down cities


let cities = system.getAllCities();
cities.forEach(city => {
    console.log("city", city.getName());
    const halls = city.getCinemaHalls();

    // console.log("halls for city: ", city)
    halls.forEach(hall => {
        console.log(hall.getMovie())
    })
})



//select city to get list of movies
let movies = system.getMovies(cities[0]);
console.log("movies: ", movies);


//user selects a movie from the list and gets the cinemas running the movies
let halls = system.getCinemaHalls(movies[0], cities[0]);
console.log("halls: ", halls)

//getSeating arrangement
let seats = halls[0].getSeats();
console.log("position of seat: ", seats[0].getPosition());
console.log("availability of seat: ", seats[0].isAvailable());

//select show and book tickets
let response = system.bookTicket(halls[0], seats[0], user1);
response.then(r => {
    console.log("response: ", r)
})




