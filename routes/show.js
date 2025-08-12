const express = require("express");
// create a express router
const router = express.Router();

const {
    getShows,
    getShow,
    addShow,
    updateShow,
    deleteShow,
} = require("../controllers/show");

/*
    Routes for shows
    GET /shows - list all the shows
    GET /shows/68941f1bcef7f0dcfa6a9a4b - get a specific show
    POST /shows - add new show
    PUT /shows/68941f1bcef7f0dcfa6a9a4b - update show
    DELETE /shows/68941f1bcef7f0dcfa6a9a4b - delete show
*/
// GET /shows - list all the shows
router.get("/", async (req, res) => {
    const premiere_year = req.query.premiere_year;
    const genre = req.query.genre;
    const rating = req.query.rating;
    const shows = await getShows(genre, rating, premiere_year);    
    res.status(200).send(shows);
});

// GET /shows/:id - get a specific show
router.get("/:id", async (req, res) => {
    // retrieve id from params
    const id = req.params.id;
    const show = await getShow(id);
    res.send(show);
});

/*
    POST /shows - add new show
    This POST route need to accept the following parameters:
    - title
    - creator
    - released_year
    - end_year
    - seasons
    - genre
    - rating
*/
router.post("/", async (req, res) => {
    try {
        const title = req.body.title;
        const creator = req.body.creator;
        const premiere_year = req.body.premiere_year;
        const end_year = req.body.end_year;
        const seasons = req.body.seasons;
        const genre = req.body.genre;
        const rating = req.body.rating;

        // check error - make sure all the fields are not empty
        if ( !title || !creator || !premiere_year || !seasons || !genre || !rating ) {
            res.status(400).send({
                message: "All the fields are required",
            });
        }
        res
            .status(200)
            .send(await addShow(title, creator, premiere_year, end_year, seasons, genre, rating));
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

// PUT /shows/68941f1bcef7f0dcfa6a9a4b - update show
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id; // id of the show
        const title = req.body.title;
        const creator = req.body.creator;
        const premiere_year = req.body.premiere_year;
        const end_year = req.body.end_year;
        const seasons = req.body.seasons;
        const genre = req.body.genre;
        const rating = req.body.rating;

        // check error - make sure all the fields are not empty
        if ( !title || !creator || !premiere_year || !seasons || !genre || !rating ) {
            res.status(400).send({
                message: "All the fields are required",
            });
        }

        res.status(200).send(await updateShow(id, title, creator, premiere_year, end_year, seasons, genre, rating));
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

// DELETE /shows/68941f1bcef7f0dcfa6a9a4b - delete show
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await deleteShow(id);

        res.status(200).send({
            message: `Show with the ID of ${id} has been deleted`,
        });
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

module.exports = router;