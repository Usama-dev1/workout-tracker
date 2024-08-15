const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const workoutRoutes = require("./Routes/workouts");
const userRoutes = require("./Routes/userRoutes");
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);



mongoose.connect(process.env.MONGOO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to Database and lisenting on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
