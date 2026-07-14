import User from "../Modals/teamModal.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("role").sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            message: users.length
                ? "Users fetched successfully."
                : "No users found.",
            totalUsers: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Get All Users Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users.",
            error: error.message,
        });
    }
};