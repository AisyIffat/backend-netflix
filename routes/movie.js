const express = require("express");
// create a express router
const router = express.Router();

const {
    getMovies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie,
} = require("../controllers/movie");

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
router.get("/", async (req, res) => {
    const director = req.query.director;
    const genre = req.query.genre;
    const rating = req.query.rating;
    const movies = await getMovies(genre, rating, director);    
    res.status(200).send(movies);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
    // retrieve id from params
    const id = req.params.id;
    const movie = await getMovie(id);
    res.send(movie);
});

/*
    POST /movies - add new movie
    This POST route need to accept the following parameters:
    - title
    - director
    - released_year
    - genre
    - rating
*/
router.post("/", async (req, res) => {
    try {
        const title = req.body.title;
        const director = req.body.director;
        const released_year = req.body.released_year;
        const genre = req.body.genre;
        const rating = req.body.rating;

        // check error - make sure all the fields are not empty
        if ( !title || !director || !released_year || !genre || !rating ) {
            res.status(400).send({
                message: "All the fields are required",
            });
        }
        res
            .status(200)
            // short hand
            .send(await addMovie(title, director, released_year, genre, rating));
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

// PUT /movies/68941f1bcef7f0dcfa6a9a4b - update movie
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id; // id of the movie
        const title = req.body.title;
        const director = req.body.director;
        const released_year = req.body.released_year;
        const genre = req.body.genre;
        const rating = req.body.rating;

        // check error - make sure all the fields are not empty
        if ( !title || !director || !released_year || !genre || !rating ) {
            res.status(400).send({
                message: "All the fields are required",
            });
        }

        res
            .status(200)
            .send(
                await updateMovie(id, title, director, released_year, genre, rating)
            );
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

// DELETE /movies/68941f1bcef7f0dcfa6a9a4b - delete movie
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await deleteMovie(id);

        res.status(200).send({
            message: `Movie with the ID of ${id} has been deleted`,
        });
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

module.exports = router;