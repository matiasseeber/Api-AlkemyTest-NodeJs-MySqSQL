const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerMovies.js");

router.route("/")
    .get(controller.getAll)
    .post(controller.addOne)

router.route("/:id")
    .put(controller.replace)
    .patch(controller.patch)
    .delete(controller.deleteCharacter)

module.exports = router;