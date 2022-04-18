import asyncHandler from "express-async-handler";
import Question from "../model/question.js";

// create a question
// post /question/:paperId
const create_question = asyncHandler(async (req, res) => {
  // extract the request body
  const { question, answer, option_one, option_two, option_three } =
    req.body;

    console.log(req.params.id);

  // construct the question object
  const new_question = {
    paper: req.params.id,
    question: question,
    answer,
    options: {
      option_one,
      option_two,
      option_three,
    },
  };

  try {
    // create a new instance of question
    const question = await Question.create(new_question);

    // check creation process circle
    if (question) {
      res.status(201).json(question);
    } else {
      res.status(400).json({ message: "Bad Request " });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

// get all questions by their paper info.
// get /question/:paperId
const get_questions_by_paper = asyncHandler(async (req, res) => {
    // grab the paper ID
  const pid = req.params.id;
  try {
    const questions = await Question.find({
      paper: pid,
    });

    if (!questions) {
      return res
        .status(200)
        .json({ msg: "This paper is created, but there are no questions added yet." });
    }

    res.json(questions);
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error });
  }
});

export { create_question, get_questions_by_paper };
