const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../modules/userModel");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, age, bloodGroup, gender } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !password || !phoneNumber || !age || !bloodGroup || !gender) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        age,
        bloodGroup,
        gender,
        password: hashedPassword,
    });

    // Send success response
    res.status(201).json({ message: "User registered successfully", newUser });
});

module.exports = { registerUser };
