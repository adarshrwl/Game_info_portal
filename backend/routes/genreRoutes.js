const express = require("express");

const { addGenre, getGenre } = require("../controller/genreController");
const router = express.Router();
router.post("/addGenre", addGenre);
router.get("/getGenre", getGenre);
module.exports = router;
