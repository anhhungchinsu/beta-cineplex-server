module.exports = app => {
    const movie = require("../controllers/MovieController");  
    // Create a new Movie
    app.post("/movie", movie.create);
  
    // Retrieve all Movie
    app.get("/movie", movie.findAll);
  
    // Retrieve a single Movie with movie_id
    app.get("/movie/:movie_id", movie.findOne);
  
    // Update a Movie with movie_id
    app.put("/movie/:movie_id", movie.update);
  
    // Delete a Movie with movie_id
    app.delete("/movie/:movie_id", movie.delete);

    const cinema = require("../controllers/CinemaController")
    // Create a new Cinemas
    app.post("/cinema", cinema.create);

    // Retrieve all Cinemas
    app.get("/cinema", cinema.findAll);
  
    // Retrieve a single Cinemas with cinema_id
    app.get("/cinema/:cinema_id", cinema.findOne);
  
    // Update a Cinemas with cinema_id
    app.put("/cinema/:cinema_id", cinema.update);
  
    // Delete a Cinemas with cinema_id
    app.delete("/cinema/:cinema_id", cinema.delete);

    const auditorium = require("../controllers/AuditoriumController")
    // Create a new Auditoriums
    app.post("/auditorium", auditorium.create);

    // Retrieve all Auditoriums
    app.get("/auditorium", auditorium.findAll);
  
    // Retrieve a single Auditoriums with auditorium_id
    app.get("/auditorium/:auditorium_id", auditorium.findOne);
  
    // Update a Auditoriums with auditorium_id
    app.put("/auditorium/:auditorium_id", auditorium.update);
  
    // Delete a Auditoriums with auditorium_id
    app.delete("/auditorium/:auditorium_id", auditorium.delete);

    const movie_showing = require("../controllers/Movie_ShowingController")
    // Create a new Movie_Showings
    app.post("/movie_showing", movie_showing.create);

    // Retrieve all Movie_Showings
    app.get("/movie_showing", movie_showing.findAll);
  
    // Retrieve a single Movie_Showings with movie_showing_id
    app.get("/movie_showing/:movie_showing_id", movie_showing.findOne);
  
    // Update a Movie_Showings with movie_showing_id
    app.put("/movie_showing/:movie_showing_id", movie_showing.update);
  
    // Delete a Movie_Showings with movie_showing_id
    app.delete("/movie_showing/:movie_showing_id", movie_showing.delete);

    // Retrieve a single Movie_Showings with cinema
    app.get("/movie_showing/cinema/:cinema_id", movie_showing.findByCinema);

    // Retrieve Movie_Showings with movie_showing_id
    app.get("/movie_showing/movie/:movie_showing_movie_id", movie_showing.findByMovieId);
  };
