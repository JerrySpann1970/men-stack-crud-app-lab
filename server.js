// dependencies
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
// Import the Planet model
const Planet = require("./models/planet.js");
const methodOverride = require("method-override");
const morgan = require("morgan");


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
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new


// GET / Home page route
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// path to form to fill out
app.get("/planets/new", (req, res) => {
    res.render("planets/new.ejs");
});

// form submission path
// POST /planets
app.post("/planets", async (req, res) => {
    if (req.body.hasAtmosphere === "on") {
        req.body.hasAtmosphere = true;
    } else {
        req.body.hasAtmosphere = false;
    }
    await Planet.create(req.body);
    res.redirect("/planets");
});

// index route sends a page that list all planets
// GET /planets
app.get("/planets", async (req, res) => {
    const allPlanets = await Planet.find({});
    res.render("planets/index.ejs", { planets: allPlanets });
});

app.get("/planets/:planetId", async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/show.ejs", { planet: foundPlanet });
});

// delte an object route
app.delete("/planets/:planetId", async (req, res) => {
    await Planet.findByIdAndDelete(req.params.planetId);
    res.redirect("/planets");
});

app.get("/planets/:planetId/edit", async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/edit.ejs", { planet: foundPlanet });
});

app.put("/planets/:planetId", async (req, res) => {
    
    if (req.body.hasAtmosphere === "on") {
        req.body.hasAtmosphere = true;
    } else {
        req.body.hasAtmosphere = false;
    }

    // Update the planet in the database
    await Planet.findByIdAndUpdate(req.params.planetId, req.body);

    // Redirect to the planet's show page to see the updates
    res.redirect(`/planets/${req.params.planetId}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

