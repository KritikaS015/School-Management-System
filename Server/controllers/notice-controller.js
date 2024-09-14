import Notice from "../models/noticeSchema.js";

// Create a new notice
export const noticeCreate = async (req, res) => {
  try {
    const notice = new Notice({
      ...req.body,
      school: req.body.adminID,
    });
    const result = await notice.save();
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// List all notices for a given school
export const noticeList = async (req, res) => {
  try {
    let notices = await Notice.find({ school: req.params.id });
    if (notices.length > 0) {
      res.send(notices);
    } else {
      res.send({ message: "No notices found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a specific notice
export const updateNotice = async (req, res) => {
  try {
    const result = await Notice.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a specific notice
export const deleteNotice = async (req, res) => {
  try {
    const result = await Notice.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete all notices for a given school
export const deleteNotices = async (req, res) => {
  try {
    const result = await Notice.deleteMany({ school: req.params.id });
    if (result.deletedCount === 0) {
      res.send({ message: "No notices found to delete" });
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
