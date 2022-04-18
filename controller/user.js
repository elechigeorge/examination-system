import asyncHandler from "express-async-handler";
import generateToken from "../util/generateToken.js";
import User from "../model/user.js";
import bcryptjs from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /user/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const account_exist = await User.findOne({ email });

  // check if user exists
  if (!account_exist) {
    res.status(400).json({ message: "Kindly review your credentials" });
  }
  // match the password
  const isMatched = await bcryptjs.compare(password, account_exist.password);

  if (account_exist && isMatched) {
    res.json({
      token: generateToken(account_exist._id),
      ...account_exist._doc,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Register a new user
// @route   POST /user/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { fullname, matric_number, department, isStudent, email, password } =
    req.body;

  // check if all the fields are not empty
  if (
    fullname == "" ||
    department == "" ||
    isStudent == null ||
    email == "" ||
    password == ""
  ) {
    res.status(400).json({ message: "No field should be empty" });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("That Email is Taken");
  }

  // hash the incoming password
  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hash(password, salt);

  const user = await User.create({
    fullname: fullname,
    matric_number: matric_number,
    department: department,
    isStudent: isStudent,
    email: email,
    password: hash,
  });

  if (user) {
    res.status(201).json({
      token: generateToken(user._id),
      ...user._doc,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user by ID
// @route   GET /account/:id
// @access  Private/Admin
const get_user = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { register, login, get_user };
