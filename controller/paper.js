import asyncHandler from "express-async-handler";
import Paper from "../model/paper.js";

// create a new paper
const create_paper = asyncHandler(async (req, res) => {
  try {
    // grab the request data
    const { title, code, department } = req.body;

    // check if the request body is empty
    if (title == "" || code == "" || department == "") {
      res.status(400).json({ message: "Kindly fill in all fields" });
      return;
    }

    // check if paper already exists
    const paper_exist = await Paper.findOne({ title });

    if (paper_exist) res.status(400).json({ message: "Paper already exist" });

    // instantiate a new paper
    const new_paper = {
      title: title,
      code: code,
      department: department,
    };

    // save the new paper
    const paper = await Paper.create(new_paper);

    // return response
    res.status(201).json(paper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

// get all paper by department
const paper_by_department = asyncHandler(async (req, res) => {
  try {
    // parameter
    const department = req.params.id;

    // check if slug is not empty
    if (department == "")
      res.status(400).json({ message: "Kindly select the department" });

    // fetch all papers from that department
    const papers = await Paper.find({
      department: new RegExp("^" + department + "$", "i"),
    })

    // return response
    res.status(200).json(papers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

// get all paper
const get_all_paper = asyncHandler(async (req, res) => {
  try {
    // fetch all papers
    const papers = await Paper.find({});

    // return response
    res.status(200).json(papers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

// get single paper
const single_paper = asyncHandler(async (req, res) => {
  try {
    // parameter
    const paperId = req.params.paperId;

    // check if paper id exists
    if (paperId == "")
      res.status(400).json({ message: "Kindly select the paper" });

    // fetch single paper
    const paper = await Paper.findOne({ _id: paperId });

    if (paper) {
      res.status(200).json(paper);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

export { paper_by_department, create_paper, single_paper, get_all_paper };
