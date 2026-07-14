import User from "../Modals/teamModal.js";

export const editSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        let {
            name,
            designation,
            role,
            experience,
            skills,
            description,
            hire_date,
        } = req.body;

        // Parse skills if it comes as string
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
        if (
            !name ||
            !designation ||
            !role ||
            !experience ||
            !description ||
            !hire_date
        ) {
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

        // Check if user exists
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Duplicate Name Check (Exclude Current User)
        const duplicateUser = await User.findOne({
            name,
            _id: { $ne: id },
        });

        if (duplicateUser) {
            return res.status(409).json({
                success: false,
                message: "User with this name already exists.",
            });
        }

        // Prepare update data
        const updateData = {
            name,
            designation,
            role,
            experience,
            skills,
            description,
            hire_date,
        };

        // Update image only if new image uploaded
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            data: updatedUser,
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