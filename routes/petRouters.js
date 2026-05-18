const express = require("express");
const { createPet, updatePet, getAllPets, getSinglePet, deletePet } = require("../controllers/petControllers.js");
const petRouters = express.Router();

petRouters.post("/create-pet_details", createPet);
petRouters.patch("/update-pet/:id", updatePet);
petRouters.get("/all-pets", getAllPets);
petRouters.get("/single-pet/:id", getSinglePet);
petRouters.delete("/delete-pet/:id", deletePet );


module.exports = petRouters;