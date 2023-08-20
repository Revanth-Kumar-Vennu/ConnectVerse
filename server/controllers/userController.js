const Users = require("../models/userModel");
const bcrytp = require("bcrypt");
module.exports.register = async (req, res, next) => {
    try{
        console.log(req.body)
  const { username, email, password } = req.body;
  const userNameCheck = await Users.findOne({ username });
  if (userNameCheck)
    return res.json({ message: "Username already exists", status: false });
  const emailCheck = await Users.findOne({ email });
  if (emailCheck)
    return res.json({ message: "Email already exists", status: false });
  const hashedPassword = await bcrytp.hash(password, 10);
  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });
  delete user.password;
  return res.json({ status: true, user });
}
catch(exception){
    next(exception)
}
};
