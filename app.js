const express = require("express");
const app = express();
const cors = require("cors");
const petRouters = require("./routes/petRouters.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({message: "server is running"})
})

app.use("/",  petRouters)

module.exports = { app };