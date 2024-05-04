const User = require("../model/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email or password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User does not exits!" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(400).json({ msg: "Invalid login credentials!" });
    return;
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.secret_key,
    { expiresIn: "1h" }
  );
  res.status(200).json({ user: { email: user.email }, token });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email or password" });
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ msg: "Email is not Valid" });
    return;
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400).json({ msg: "Password not strong enough" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ msg: "User already exits!" });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashPassword);

  const user = await User.create({ email, password: hashPassword });
  if (user) {
    res.status(200).json({ user: { userId: user._id, email: user.email } });
  } else {
    res.status(400).json({ msg: "Something went wrong" });
  }
};

module.exports = { loginUser, signupUser };
