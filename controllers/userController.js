const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, institude, session, roll, mobile } =
    req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    institude,
    session,
    roll,
    mobile,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    user.institude = req.body.institude || user.institude;
    user.session = req.body.session || user.session;
    user.roll = req.body.roll || user.roll;
    user.department = req.body.department || user.department;
    user.mobile = req.body.mobile || user.mobile;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      institude: updatedUser.institude,
      session: updatedUser.session,
      roll: updatedUser.roll,
      department: updatedUser.department,
      mobile: updatedUser.mobile,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const userProfile = asyncHandler(async (req, res) => {
  const userdetails = await User.findById(req.user._id);
  res.json(userdetails);
});

const allUserList = asyncHandler(async (req, res) => {
  const userlist = await User.find();
  res.json(userlist);
});
module.exports = {
  authUser,
  updateProfile,
  registerUser,
  userProfile,
  allUserList,
};
