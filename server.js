// IMPORT DOTENV & CONFIGURE
import dotenv from "dotenv";
dotenv.config();
// IMPORT PACKAGES
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();

// IMPORT ROUTE FILES
import User from "./route/user.js";
import Paper from "./route/paper.js";
import Question from "./route/question.js";
import Exam from "./route/exam.js";

// INITIALIZE EXPRESS SEVER
const server = express();

// CONFIGURE MIDDLEWARES
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// CONNECT TO MONGODB DATABASE FROM ATLAS

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => console.log("Database connected successfully..."))
  .catch((error) => console.error("Database connection error" + error));

// PRODUCTION ENVIRONMENT SETTING
server.use(express.static(path.resolve(__dirname, "./frontend/build")));

// ROUTES SETTING
server.use("/user", User);
server.use("/paper", Paper);
server.use("/question", Question);
server.use("/exam", Exam);


if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  server.use(express.static('frontend/build'));

  // Express serve up index.html file if it doesn't recognize route
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;

// LAUNCH SERVER ROCKET
server.listen(PORT, () => console.log("SERVER RESOURCES RUNNING ON PORT 4000"));