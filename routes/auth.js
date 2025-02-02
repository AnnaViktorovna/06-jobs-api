const express = require("express");
const router = express.Router();

// Define the register function
const register = (req, res) => {
    res.send("Registration successful");
};

// Define the login function
const login = (req, res) => {
    res.send("Login successful");
};

// Use the functions in your routes directly since they are defined in the same file
router.post("/register", register);
router.post("/login", login);

module.exports = router;
