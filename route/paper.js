import express from "express";
const router = express.Router();

import { authenticate } from "../middleware/authenticate_user.js";

import {
  paper_by_department,
  create_paper,
  single_paper,
  get_all_paper,
} from "../controller/paper.js";

router.route("/").post(authenticate, create_paper).get(get_all_paper);
router.route("/:id").get(single_paper);
router.route("/department/:id").get(paper_by_department);


export default router;
