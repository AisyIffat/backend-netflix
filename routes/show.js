const express = require("express");
// create a express router
const router = express.Router();

// import the Show model
const Show = require("../models/show");

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
router.get("/:id", async (req, res) => {
    // retrieve id from params
    const id = req.params.id;
    // load the show data
    const show = await Show.findById(id);
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

        // create new show
        const newShow = new Show({
            title: title,
            creator: creator,
            premiere_year: premiere_year,
            end_year: end_year,
            seasons: seasons,
            genre: genre,
            rating: rating,
        });
        // save the new show into mongodb
        await newShow.save(); // clicking the "save" button

        res.status(200).send(newShow);
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

        const updatedShow = await Show.findByIdAndUpdate(
            id, 
            {
                title: title,
                creator: creator,
                premiere_year: premiere_year,
                end_year: end_year,
                seasons: seasons,
                genre: genre,
                rating: rating,
            }, 
            {
                new: true, // return the updated data
            }
        );

        res.status(200).send(updatedShow);
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

// DELETE /shows/68941f1bcef7f0dcfa6a9a4b - delete show
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // delete the movie
        await Show.findByIdAndDelete(id);

        res.status(200).send({
            message: `Show with the ID of ${id} has been deleted`,
        });
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

module.exports = router;