const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
require("dotenv").config();
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)
        .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Wrong password");
    }
    const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(StatusCodes.OK).json({ user: { name: user.getName() }, token });
};

module.exports = {
    register,
    login,
};