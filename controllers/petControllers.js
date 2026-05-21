const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnection");

const createPet = async (req, res) => {
  const newPet = req.body;
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.insertOne(newPet);
    res.json({ success: true, message: "pet Created Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const updatePet = async (req, res) => {
  const updatedPet = req.body;
  const { id } = req.params;
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedPet },
    );
    return res.json({ success: true, message: result });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getAllPets = async (req, res) => {
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.find().toArray();
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getSinglePet = async (req, res) => {
  const { id } = req.params;
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.findOne({ _id: new ObjectId(id) });
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.deleteOne({ _id: new ObjectId(id) });

    return res.json({ success: true, data: result });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const SearchPet = async (req, res) => {
  const { query } = req.query;

  try {
    const petCollection = await getCollection("petCollection");
    const SearchQuery = {
      $or: [
        { petName: { $regex: query, $options: "i" } },
        { Species: { $regex: query, $options: "i" } },
        { breed: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { gender: { $regex: query, $options: "i" } },
      ],
    };

    if (query) {
      const result = await petCollection.find(SearchQuery).toArray();
      return res.json({ success: true, data: result });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const filterPets = async (req, res) => {
  const { species, gender } = req.query;
  try {
    const filter = {};
    if (species) {
      filter.Species = { $regex: `^${species}$`, $options: "i" };
      // filter.species = {$regex: species, $options: "i"} eta kaj korbe na karon female text er modde male text ache
    }
    if (gender) {
      // filter.gender = {$regex: gender, $options: "i"}; eta kaj korbe na karon female text er modde male text ache
      filter.gender = { $regex: `^${gender}$`, $options: "i" };
    }
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.find(filter).toArray();
    res.json({message:true, data: result});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const AdoptRequest = async (req, res) => {
  const { adopted } = req.body;
  const Adoptrequestbody = req.body;
  const { id } = req.params;
  try {
    const petCollection = await getCollection("petCollection");
    const AdoptRequestCollection = await getCollection(
      "AdoptRequestCollection",
    );

    const result = await petCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { adoptedStatus: true, request: Adoptrequestbody } },
    );
    return res.json({ success: true, message: result });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getMyRequest = async (req, res) => {
  const { myEmail } = req.params;
  const filter = {
    "request.CustomerEmail": `${myEmail}`,
  };
  try {
    const requestCollection = await getCollection("petCollection");
    const result = await requestCollection.find(filter).toArray();

    return res.json({ success: true, data: result });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

/// create a function get my listing
const getMyListing = async (req, res) => {
  const { myEmail } = req.params;
  const filter = {
    Owner_Email: `${myEmail}`,
  };
  try {
    const requestCollection = await getCollection("petCollection");
    const result = await requestCollection.find(filter).toArray();

    return res.json({ success: true, data: result });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const cancleAdoptRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { request: {}, adoptedStatus: false } },
    );
    return res.json({ success: true, message: result });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

const RejectAdoptRequest = async (req, res) => {
  const { id } = req.params;
  const rejectionBody = req.body;
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          request: rejectionBody,
          adoptedStatus: false,
        },
      },
    );
    return res.json({ success: true, message: result });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

const ApproveAdoptRequest = async (req, res) => {
  const { id } = req.params;
   const ApproveBody = req.body;
  try {
    const petCollection = await getCollection("petCollection");
    const result = await petCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          request: ApproveBody,
          adoptedStatus: true,
        },
      },
    );
    return res.json({ success: true, message: result });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

module.exports = {
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
  ApproveAdoptRequest
};
