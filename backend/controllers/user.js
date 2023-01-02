const {
  validateEmail,
  validateLength,
} = require("../helpers/validation");

const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { verifyUserEmail } = require("../helpers/newMailer");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
    } = req.body;

    console.log(email)

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "Email already exists, please try with a different email address",
      });
    }

    if (!validateLength(first_name, 2, 20)) {
      return res.status(400).json({
        message: "First name must be between 3 and 20 characters long",
      });
    }

    if (!validateLength(last_name, 1, 20)) {
      return res.status(400).json({
        message: "Last name must be between 1 and 20 characters long",
      });
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be between 6 and 40 characters long",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

    verifyUserEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        "Registered Sucessfully! Please activate your email to get started.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already verified" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: "Email verified successfully" });
    }
  } catch {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "There is no account associated with this email address",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid Credentials. Please try again.",
      });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Successfully logged in! Welcome back " + user.first_name + "!",
    });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
