import express from "express";
const router = express.Router();

import { register, login, get_user } from "../controller/user.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/:id").get(get_user);

export default router;
