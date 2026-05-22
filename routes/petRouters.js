const express = require("express");
const {
  createPet,
  updatePet,
  getAllPets,
  getSinglePet,
  deletePet,
  SearchPet,
  filterPets,
  AdoptRequest,
  getMyRequest,
  getMyListing,
  cancleAdoptRequest,
  RejectAdoptRequest,
  ApproveAdoptRequest,
  findUnique,
} = require("../controllers/petControllers.js");
const { verifyUser } = require("../middleware/varifyUser.js");

const petRouters = express.Router();

petRouters.post("/create-pet_details", createPet);
petRouters.patch("/update-pet/:id", verifyUser, updatePet);
petRouters.get("/all-pets", getAllPets);
petRouters.get("/single-pet/:id", getSinglePet);
petRouters.delete("/delete-pet/:id", verifyUser, deletePet);
petRouters.get("/search", SearchPet);
petRouters.get("/filter-pets", filterPets);
petRouters.patch("/send-adoption-request/:id", verifyUser, AdoptRequest);
petRouters.get("/my-request/:myEmail", getMyRequest);
petRouters.get("/my-listing/:myEmail", getMyListing);
petRouters.patch("/cancle-adopt-request/:id", verifyUser, cancleAdoptRequest);
petRouters.patch("/RejectAdoptRequest/:id", verifyUser, RejectAdoptRequest);
petRouters.patch("/approve-request/:id", verifyUser, ApproveAdoptRequest);
petRouters.get("/find-uniqueCategorys", findUnique);

module.exports = petRouters;
