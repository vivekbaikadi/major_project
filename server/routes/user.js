
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();



router.post("/signup", async (req, res) => {
    try {
        console.log("📌 Received Signup Request:", req.body); // Debug request

        const { name, phone, email, password } = req.body;

        if (!name || !phone || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, phone, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        res.status(200).json({
            success: true,  // ✅ Must include success key
            message: "User Authenticated",
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                phone: existingUser.phone,
                email: existingUser.email,
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});



router.get('/', async (req, res) => {
    try {
        const userList = await User.find().select("-password"); // Exclude passwords

        if (!userList.length) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        res.status(200).json({ success: true, users: userList });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


router.get('/:id', async (req, res) =>{
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(500).json({message: "The user with the given ID was not found."})
    }
    res.status(200).send(user);
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: "The user account is deleted!"})
        } else{
            return res.status(404).json({success: false, message: "user not found"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
});

router.get('/get/count', async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount){
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
});

export default router;
