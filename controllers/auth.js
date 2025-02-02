const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User, validateRegisterUser, validateLoginUser} = require("../models/User");


module.exports.registerUserCtrl = asyncHandler(async (req, res) => {

    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }


    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        await user.save();  // Save the new user
    } catch (err) {
        return res.status(500).json({ message: "Failed to create user: " + err.message });
    }


    res.status(201).json({
        message: "Registration successful. Please log in.",
    });
});


module.exports.loginUserCtrl = asyncHandler (async (req, res ) =>{

    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }


    const user = await User.findOne({ email: req.body.email});
    if (!user) {
        return res.status(400).json({ message: "invalid email or password "});
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid  password "});
    }

    const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    console.log("Generated Token:", token); // Логируем сгенерированный токен
    res.status(200).json({ msg: "user login", token });

});