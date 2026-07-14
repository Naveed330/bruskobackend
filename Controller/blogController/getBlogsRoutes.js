import Blog from "../../Modals/blogModal/BlogModal.js";

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully.",
            totalBlogs: blogs.length,
            data: blogs,
        });
    } catch (error) {
        console.error("Get Blogs Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};