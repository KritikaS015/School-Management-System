import Complain from "../models/complainSchema.js";

// Create a new complaint
export const complainCreate = async (req, res) => {
  try {
    const complain = new Complain(req.body);
    const result = await complain.save();
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// List all complaints for a given school
export const complainList = async (req, res) => {
  try {
    let complains = await Complain.find({ school: req.params.id }).populate(
      "user",
      "name"
    );
    if (complains.length > 0) {
      res.send(complains);
    } else {
      res.send({ message: "No complaints found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
