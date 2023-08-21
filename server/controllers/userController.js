const Users = require("../models/userModel");
const bcrytp = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
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
  } catch (exception) {
    next(exception);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (!user)
      return res.json({
        message: "Did not find your account! Please Sign Up before you login.",
        status: false,
      });
    const vaidatePassword = await bcrytp.compare(password, user.password);
    if (!vaidatePassword) {
      return res.json({
        message: "Incorrect Password Provided!",
        status: false,
      });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (exception) {
    next(exception);
  }
};

module.exports.createAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatar = req.body.image;
    const userData = await Users.findByIdAndUpdate(
      userId,
      {
        $set: {
          isAvatarSet: true,
          avatar: avatar,
        },
      },
      { new: true } 
    );
    return res.json({ isSet: userData.isAvatarSet, image: userData.avatar });
  } catch (exception) {
    next(exception);
  }
};
