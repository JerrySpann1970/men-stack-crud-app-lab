const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    name: String,
    distance: Number,
    hasAtmosphere: Boolean,
});

const Planet = mongoose.model("Planet", planetSchema); // create model

module.exports = Planet;