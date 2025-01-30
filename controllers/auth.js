const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
require("dotenv").config();
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide name, email, and password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Wrong password");
    }

    const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });

};
module.exports = {
    register,
    login,
};