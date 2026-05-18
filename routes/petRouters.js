const express = require("express");
const { createPet } = require("../controllers/petControllers");
const petRouters = express.Router();

petRouters.post("/create-pet_details", createPet)

module.exports = petRouters;