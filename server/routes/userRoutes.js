const express = require("express");
const router = express.Router();
const { registerUser, userLogin } = require("../controllers/userController"); // Import functions from userController
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware")
// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login",jwtAuthMiddleware.generateJwtToken, userLogin);

module.exports = router;
