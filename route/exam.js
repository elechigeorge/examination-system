import express from "express";
const router = express.Router();

import { authenticate } from "../middleware/authenticate_user.js";

import {
  create_exam,
  retrieve_user_exam,
  single_exam,
  exam_by_department
} from "../controller/exam.js";

router.route("/").post(authenticate, create_exam);
router.route("/:id").get(retrieve_user_exam);
router.route("/user/:id").get(single_exam);
router.route("/d/:department").get(exam_by_department);


export default router;
