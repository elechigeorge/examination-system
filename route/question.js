import express from "express";
const router = express.Router();

import { authenticate } from "../middleware/authenticate_user.js";

import {
  create_question,
  get_questions_by_paper,
} from "../controller/question.js";

router.route("/:id").post(authenticate, create_question);
router.route("/:id").get(get_questions_by_paper);

export default router;
