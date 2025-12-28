const User = require("../models/userModel");
const bcrypt = require("");

const login = (req, res) => {
  console.log(req.body);
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All Fields are required!!" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      msg: "User Already Exists!!",
    });
  }

  
};
module.exports = { login, signUp };
