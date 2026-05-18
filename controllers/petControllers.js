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
    const {id} = req.params;
    try {
        const petCollection = await getCollection("petCollection");
        const result = await petCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: updatedPet},
        )
        return res.json({ success: true, message: result })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const getAllPets = async (req, res)=>{
    try {
        const petCollection = await getCollection("petCollection");
        const result = await petCollection.find().toArray();
         return res.json({ success: true, data: result })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const getSinglePet = async (req, res)=>{
    const {id} = req.params;
    try {
        const petCollection = await getCollection("petCollection");
        const result = await petCollection.findOne({_id: new ObjectId(id)});
         return res.json({ success: true, data: result })
    } catch (error) {
         return res.json({ success: false, message: error.message })
    }
}

const deletePet = async (req, res) =>{
    const {id} = req.params;
    try {
        const petCollection = await getCollection("petCollection");
        const result = await petCollection.deleteOne({_id: new ObjectId(id)});

         return res.json({ success: true, data: result })
    } catch (error) {
         return res.json({ success: false, message: error.message })
    }
}

const SearchPet = async (req, res)=>{
    try {
        const petCollection = await getCollection("petCollection");
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


module.exports = {createPet, updatePet, getAllPets, getSinglePet, deletePet}