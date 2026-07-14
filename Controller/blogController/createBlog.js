import Blog from "../../Modals/blogModal/BlogModal.js";

export const createBlog = async (req, res) => {
    try {
        let { title, content } = req.body;

        // Trim values
        title = title?.trim();
        content = content?.trim();

        // Validation
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required.",
            });
        }

        // Check if blog with same title already exists
        const existingBlog = await Blog.findOne({ title });

        if (existingBlog) {
            return res.status(409).json({
                success: false,
                message: "A blog with this title already exists.",
            });
        }

        // Image upload (optional)
        const image = req.file ? req.file.path : "";

        // Create blog
        const blog = await Blog.create({
            title,
            content,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully.",
            data: blog,
        });

    } catch (error) {
        console.error("Create Blog Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};