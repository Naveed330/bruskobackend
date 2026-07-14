import Blog from "../../Modals/blogModal/BlogModal.js";
import mongoose from "mongoose";
export const singleBlogRoute = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID format.",
            });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully.",
            data: blog,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};