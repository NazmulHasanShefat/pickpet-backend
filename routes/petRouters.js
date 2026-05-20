const express = require("express");
const { createPet, updatePet, getAllPets, getSinglePet, deletePet, SearchPet, filterPets, AdoptRequest } = require("../controllers/petControllers.js");
const { verifyUser } = require("../middleware/varifyUser.js");

const petRouters = express.Router();

petRouters.post("/create-pet_details", createPet);
petRouters.patch("/update-pet/:id", updatePet);
petRouters.get("/all-pets", getAllPets);
petRouters.get("/single-pet/:id", getSinglePet);
petRouters.delete("/delete-pet/:id",  deletePet );
petRouters.get("/search", SearchPet);
petRouters.get("/filter-pets", filterPets);
petRouters.patch("/send-adoption-request/:id", verifyUser ,AdoptRequest)


module.exports = petRouters;