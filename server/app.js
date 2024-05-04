const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const workOutsRoute = require("./routes/workOuts");
const userRoute = require("./routes/user");

const PORT = `${process.env.PORT}`;
const MONGO_URL = `${process.env.MONGO_URI}`;

app.use(express.json());
app.use(cors());
app.use("/api/workouts", workOutsRoute);
app.use("/api/user", userRoute);

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB!");
    app.listen(PORT, () => {
      console.log(`server is now listening to PORT: ${PORT} `);
    });
  } catch (error) {
    console.log("Could not connect to DB because...");
    console.log(error);
  }
};

connect();
