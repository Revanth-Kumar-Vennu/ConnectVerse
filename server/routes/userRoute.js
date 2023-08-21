const { register, login, createAvatar } = require("../controllers/userController");

const router = require("express").Router();
router.post("/register",register)
router.post("/login",login)
router.post("/createAvatar/:id",createAvatar)
module.exports = router