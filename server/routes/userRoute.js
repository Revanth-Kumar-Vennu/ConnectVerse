const { register, login, createAvatar, getAllUsers } = require("../controllers/userController");

const router = require("express").Router();
router.post("/register",register)
router.post("/login",login)
router.post("/createAvatar/:id",createAvatar)
router.get("/allUsers/:id",getAllUsers)
module.exports = router