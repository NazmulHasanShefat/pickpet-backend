const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnection");

const createPet = async(req, res)=>{
    const newPet = req.body;
    try {
        const petCollection = await getCollection("petCollection");
        const result = await petCollection.insertOne(newPet)
        res.json({ success: true, message: "pet Created Successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const updatePet = async (req, res)=> {
    const updatedPet = req.body;
    const id = req.params;
    try {
        const petCollection = await getCollection("petCollection");
        const result = petCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: updatedPet}
        )
        return res.json({ success: false, message: "updated successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = {createPet}