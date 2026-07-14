import mongoose from "mongoose";
import Blog from "../../Modals/blogModal/BlogModal.js";

export const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        let { title, content } = req.body;

        // Trim values
        title = title?.trim();
        content = content?.trim();

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID.",
            });
        }

        // Validation
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required.",
            });
        }

        // Find blog
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }

        // Check duplicate title (exclude current blog)
        const existingBlog = await Blog.findOne({
            title,
            _id: { $ne: id },
        });

        if (existingBlog) {
            return res.status(409).json({
                success: false,
                message: "A blog with this title already exists.",
            });
        }

        // Update image if new file uploaded
        const image = req.file ? req.file.path : blog.image;

        // Update blog fields
        blog.title = title;
        blog.content = content;
        blog.image = image;

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully.",
            data: blog,
        });

    } catch (error) {
        console.error("Edit Blog Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};
