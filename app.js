const express = require("express");
const app = express();
const cors = require("cors");
const petRouters = require("./routes/petRouters.js");

app.use(cors());
app.use(express.json());


app.use("/",  petRouters)

module.exports = { app };