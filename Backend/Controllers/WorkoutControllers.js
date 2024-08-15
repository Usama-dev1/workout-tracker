const WorkoutModel = require("../Models/WorkoutSchema");
const mongoose = require("mongoose");
//get all workout
const getAllWorkout = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workout = await WorkoutModel.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//get single workout
const oneWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid workout ID" });
    }

    const workout = await WorkoutModel.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid workout ID" });
    }
    res.status(500).json({ message: error.message });
  }
};

//post a workout
const postWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  
  try {
    const user_id = req.user._id;
    const workout = await WorkoutModel.create({ title, load, reps,user_id});
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "not a valid id" });
    }
    const workout = await WorkoutModel.findByIdAndDelete(id);
    if (!workout) {
      return res.status(400).json({ message: "invalid no workout found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid workout ID" });
    }
    res.status(500).json({ message: error.message });
  }
};

//update a workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!mongoose.isValidObjectId(id) || id === null) {
      return res.status(400).json({ message: "invalid no workout found" });
    }
    if (!workout) {
      return res.status(400).json({ message: "invalid no workout found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid workout ID" });
    }
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  postWorkout,
  getAllWorkout,
  updateWorkout,
  deleteWorkout,
  oneWorkout,
};
