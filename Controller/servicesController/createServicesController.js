import Service from "../../Modals/servicseCategoryModal/servicesModal.js";
import Category from "../../Modals/servicseCategoryModal/categoryModal.js";

// Create Service API
export const createServices = async (req, res) => {
    try {
        const {
            category,
            title,
            description,
            price,
            discount_price,
            discount_title,
        } = req.body;

        // Cloudinary image from multer
        const image = req.file?.path;

        // Required validation
        if (!category || !title || !description || price === undefined || !image) {
            return res.status(400).json({
                success: false,
                message:
                    "Category, title, description, price and image are required.",
            });
        }

        // Check if category exists
        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // Price validation
        if (Number(price) < 0) {
            return res.status(400).json({
                success: false,
                message: "Price cannot be negative.",
            });
        }

        if (discount_price && Number(discount_price) < 0) {
            return res.status(400).json({
                success: false,
                message: "Discount price cannot be negative.",
            });
        }

        if (
            discount_price &&
            Number(discount_price) > Number(price)
        ) {
            return res.status(400).json({
                success: false,
                message: "Discount price cannot be greater than price.",
            });
        }

        // Duplicate check within same category
        const existingService = await Service.findOne({
            category,
            title: title.trim(),
        });

        if (existingService) {
            return res.status(409).json({
                success: false,
                message: "This service already exists in the selected category.",
            });
        }

        // Create Service
        const newService = await Service.create({
            category,
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            discount_price: Number(discount_price) || 0,
            image,
            discount_title: discount_title?.trim() || "",
        });

        // Populate category before returning response
        const populatedService = await Service.findById(newService._id)
            .populate("category", "category_name image");

        return res.status(201).json({
            success: true,
            message: "Service created successfully.",
            data: populatedService,
        });
    } catch (error) {
        console.error("Create Service Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};