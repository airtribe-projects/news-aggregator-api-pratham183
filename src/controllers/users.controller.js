const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUND = 5;
const JWT_SECRET = process.env.JWT_SECRET;
const register = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  // console.log(name, email, password);

  if (!email || !name || !password) {
    return res.status(400).send("Required Feild Missing");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid Email Format");
  }

  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
  let body = {
    name: name,
    email: email,
    password: hashedPassword,
    preferences: req.body.preferences,
  };
  usersModel.push(body);
  // console.log(usersModel);

  return res.status(200).send("User Registered Successfully");
};

const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(400).send("Required Feild Missing");
  }
  console.log(usersModel);

  const user = usersModel.find((u) => {
    console.log(u.email);
    console.log(email);

    return u.email === email;
  });

  console.log(user);

  if (!user) {
    return res.status(401).send("User Not Found");
  }

  const isValidpass = await bcrypt.compare(password, user.password);
  if (!isValidpass) {
    return res.status(401).send("Wrong Password");
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(200).send({ token: token });
};

const users = (req, res) => {
  if (usersModel.length === 0) {
    res.status(404).send("No user Found");
  }
  res.send(usersModel);
};

const getPreferences = (req, res) => {
  const email = req.user.email;

  const user = usersModel.find((u) => u.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  return res.status(200).send({
    preferences: user.preferences || [],
  });
};
const updatePreferences = (req, res) => {
  const email = req.user.email;
  const newPreferences = req.body.preferences;

  if (!newPreferences) {
    return res.status(400).send({ message: "Preferences required" });
  }

    if (newPreferences && !Array.isArray(newPreferences)) {
    return res.status(400).send("Preferences must be an array");
  }

  const user = usersModel.find((u) => u.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  user.preferences = newPreferences;

  return res.status(200).send({ message: "Preferences updated" });
};

module.exports = { register, login, users, getPreferences, updatePreferences };
