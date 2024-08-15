const express = require("express");
const {
  postWorkout,
  oneWorkout,
  deleteWorkout,
  getAllWorkout,
  updateWorkout,
} = require("../Controllers/WorkoutControllers");
const requireAuth=require('../middleware/requiredAuth')
const router = express.Router();

router.use(requireAuth)
//get all workouts
router.get("/", getAllWorkout);

//post a workout
router.post("/", postWorkout);

//get a single workout
router.get("/:id", oneWorkout);

//delete a single workout
router.delete("/:id", deleteWorkout);

//update a single workout
router.patch("/:id", updateWorkout);

module.exports = router;
