const Work = require("../model/Work");

const getAllWorkOuts = async (req, res) => {
  const user_id = req.user.userId;
  const works = await Work.find({ user_id }).sort({ createdAt: -1 });
  res.json({ works });
};

const postWorkOuts = async (req, res) => {
  req.body.user_id = req.user.userId;
  try {
    const { title, reps, load } = req.body;

    if (!title || !reps || !load) {
      res.json({ msg: "Please provide a title, reps and load" });
      return;
    }

    const work = await Work.create({ ...req.body });
    res.json({ work });
    return;
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getSingleWorkOut = async (req, res) => {
  const { id } = req.params;

  const work = await Work.findById({ _id: id });
  if (!work) {
    res.json({ msg: `No such Workout with ${id} exits"` });
    return;
  } else {
    res.json({ work });
  }
};

const deleteWorkOut = async (req, res) => {
  const { id } = req.params;

  const work = await Work.findByIdAndDelete({ _id: id });
  if (!work) {
    res.json({ msg: `No such workout with ${id} exists` });
    return;
  } else {
    res.json({ msg: "Workout Deleted!" });
  }
};

const updateWorkOut = async (req, res) => {
  const { id } = req.params;

  const work = await Work.findById({ _id: id });
  if (!work) {
    res.json({ msg: `No such Workout with ${id}` });
    return;
  }

  const updatedWorkout = await Work.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.json({ updatedWorkout });
};

module.exports = {
  getAllWorkOuts,
  postWorkOuts,
  getSingleWorkOut,
  deleteWorkOut,
  updateWorkOut,
};
