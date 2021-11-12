const express = require("express");
const routerCharacters = require("./src/routers/routerCharacters.js");
const routerMovies = require("./src/routers/routerMovies.js");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/characters", routerCharacters);
app.use("/movies", routerMovies);

app.listen(80, function() {
    console.log("Server is active");
})