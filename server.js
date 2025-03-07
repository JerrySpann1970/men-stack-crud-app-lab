// dependencies
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
// Import the Fruit model
const Fruit = require("./models/planets.js");

// init the express application
const app = express();

// config code
dotenv.config();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// mount middleware functions here

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});



app.listen(3000, () => {
    console.log('Listening on port 3000');
});

