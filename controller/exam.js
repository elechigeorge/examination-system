import asyncHandler from "express-async-handler";
import Exam from "../model/exam.js";

// register a new exam 
const create_exam = asyncHandler(async (req, res) => {
  try {
    // grab the request data
    const { user, paper, result } = req.body;

    // check if the request body is empty
    if (paper == "" || user == "" || result == "") {
      res.status(400).json({ message: "Kindly select all fields" });
      return;
    }

    // instantiate a new paper
    const new_exam = {
      user,
      paper,
      result,
    };

    // save the new paper
    const exam = await Exam.create(new_exam);

    // return response
    res
      .status(201)
      .json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

// retrieve registered exam
const retrieve_user_exam = asyncHandler(async (req, res) => {
  try {
      // parameter
      const userId = req.params.id;
    // locate current user exams 
    const exams = await Exam.find({user: userId}).populate("paper");

    // return response
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

// get single paper
const single_exam = asyncHandler(async (req, res) => {
  try {
    // parameter
    const examId = req.params.id;

    // check if paper id exists
    if (examId == "")
      res.status(400).json({ message: "Bad request" });

    // fetch single paper
    const exam = await Exam.findOne({ _id: examId });

    if (exam) {
      res.status(200).json(exam);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});


// get all paper by department
const exam_by_department = asyncHandler(async (req, res) => {
  try {
    // parameter
    const department = req.params.department;

    // check if slug is not empty
    if (department == "")
      res.status(400).json({ message: "Kindly select the department" });

    // fetch all papers from that department
    const exams = await Exam.find({}).populate("user").populate("paper");

    if(exams) {
      const exams_filtered = exams.filter((exam) => exam.user.department === department);
      return res.status(200).json(exams_filtered)
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

export {create_exam, retrieve_user_exam, single_exam, exam_by_department };
