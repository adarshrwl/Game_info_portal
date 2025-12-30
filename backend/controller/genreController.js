const Genre = require("../models/genreModel");

const addGenre = async (req, res) => {
  console.log(req.body);
};

const getGenre = async (req, res) => {
  console.log(req.body);
};

module.exports = {
  addGenre,
  getGenre,
};
