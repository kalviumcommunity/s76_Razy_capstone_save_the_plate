const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST endpoint for creating a user
router.post("/signup", async (req, res) => {
    try {
        const { error } = req.body;
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User already exists!" });
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error!" });
    }
});

// PUT endpoint for updating user details
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).send({ message: "User updated successfully!", user });
    } catch (error) {
        res.status(500).send({ message: "Internal server error!", error });
    }
});

module.exports = router;