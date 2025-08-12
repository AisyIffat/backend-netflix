// import the Movie model
const Show = require("../models/show");

async function getShows(genre, rating, premiere_year) {
    /// create a container for filter
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
    return shows
}

async function getShow(id) {
    // load the show data
    const show = await Show.findById(id);
    return show;
}

async function addShow(title, creator, premiere_year, end_year, seasons, genre, rating) {
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
    return await newShow.save(); // clicking the "save" button
}

async function updateShow(id, title, creator, premiere_year, end_year, seasons, genre, rating) {
    return await Show.findByIdAndUpdate(
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
}

async function deleteShow(id) {
    // delete the movie
    await Show.findByIdAndDelete(id);
}

module.exports = {
    getShows,
    getShow,
    addShow,
    updateShow,
    deleteShow,
};