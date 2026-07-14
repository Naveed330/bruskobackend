import User from '../Modals/teamModal.js'
import bcrypt from "bcrypt";
export const createUser = async (req, res) => {
    try {
        let {
            name,
            designation,
            role,
            experience,
            skills,
            description,
            hire_date,
            email,
            password,
        } = req.body;

        // ✅ FIX: parse skills if it's a string
        if (typeof skills === "string") {
            try {
                skills = JSON.parse(skills);
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: "Skills must be a valid JSON array.",
                });
            }
        }

        // Validation
        if (!name || !designation || !role || !experience || !description || !hire_date || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required.",
            });
        }

        // Skills Validation
        if (!Array.isArray(skills)) {
            return res.status(400).json({
                success: false,
                message: "Skills must be an array.",
            });
        }

        if (skills.length > 3) {
            return res.status(400).json({
                success: false,
                message: "Maximum 3 Skills are Allowed.",
            });
        }

        const existingUser = await User.findOne({ name });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists.",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            designation,
            role,
            experience,
            skills,
            email,
            password: hashedPassword,
            description,
            hire_date,
            image: req.file ? req.file.path : "",
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: user,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};