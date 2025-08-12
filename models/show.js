const { Schema, model } = require("mongoose");

// declare the schema for Shows
const showSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    premiere_year: {
        type: Number,
        required: true,
    },
    end_year: Number,
    seasons: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

// create a Modal from the schema
const Show = model("Show", showSchema);

module.exports = Show;