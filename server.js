const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to Mongodb using Mongoose
async function connectToMongoDB() {
    try {
        // wait for the MongoDB to connect
        await mongoose.connect("mongodb://localhost:27017/netflix");
        console.log("MongoDB is Connected");
    } catch (error) {
        console.log(error);
    }
}

// trigger the connection with MongoDB
connectToMongoDB();

// declare the schema for Movies
const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    released_year: Number,
    genre: String,
    rating: Number,
});

// declare the schema for Shows
const showSchema = new mongoose.Schema({
    title: String,
    creator: String,
    premiere_year: Number,
    end_year: Number,
    seasons: Number,
    genre: String,
    rating: Number,
});

// create a Modal from the schema
const Movie = mongoose.model("Movie", movieSchema);

// create a Modal from the schema
const Show = mongoose.model("Show", showSchema);

// setup root route
app.get("/", (req, res) => {
    res.send("Happy coding!");
});

/*
    Routes for movies
    GET /movies - list all the movies
    GET /movies/68941f1bcef7f0dcfa6a9a4b - get a specific movie
    POST /movies - add new movie
    PUT /movies/68941f1bcef7f0dcfa6a9a4b - update movie
    DELETE /movies/68941f1bcef7f0dcfa6a9a4b - delete movie
*/
// GET /movies - list all the movies
/*
    query params is everything after the ? mark
*/
app.get("/movies", async (req, res) => {
    const director = req.query.director;
    const genre = req.query.genre;
    const rating = req.query.rating;

    // create a container for filter
    let filter = {};
    // if director exists, then only add it into the filter container
    if (director) {
        filter.director = director;
    }
    // if genre exists, then only add it into the filter container
    if (genre) {
        filter.genre = genre;
    }
    // if rating exists, then only add it into the filter container
    if (rating) {
        filter.rating = { $gt: rating };
    }

    // load the movies data from MongoDB
    const movies = await Movie.find(filter);
    res.send(movies);
});

// GET /movies/:id - get a specific movie
app.get("/movies/:id", async (req, res) => {
    // retrieve id from params
    const id = req.params.id;
    // load the movie data
    const movie = await Movie.findById(id);
    res.send(movie);
});

app.get("/shows", async (req, res) => {
    const premiere_year = req.query.premiere_year;
    const genre = req.query.genre;
    const rating = req.query.rating;

    // create a container for filter
    let filter = {};
    // if director exists, then only add it into the filter container
    if (premiere_year) {
        filter.premiere_year = { $gt: premiere_year };
    }
    // if genre exists, then only add it into the filter container
    if (genre) {
        filter.genre = genre;
    }
    // if rating exists, then only add it into the filter container
    if (rating) {
        filter.rating = { $gt: rating };
    }

    // load the shows data from MongoDB
    const shows = await Show.find(filter);
    res.send(shows);
});

// GET /shows/:id - get a specific show
app.get("/shows/:id", async (req, res) => {
    // retrieve id from params
    const id = req.params.id;
    // load the show data
    const show = await Show.findById(id);
    res.send(show);
});

// start the express server
app.listen(2808,() => {
    console.log("server is running at http://localhost:2808");
});