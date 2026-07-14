import Category from "../../Modals/servicseCategoryModal/categoryModal.js";

// =============================
// Create Category
// POST /api/category
// =============================
export const createCategory = async (req, res) => {
    try {
        const { category } = req.body;

        // Validation
        if (!category || category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category title is required.",
            });
        }

        // Check duplicate
        const existingCategory = await Category.findOne({
            category: category.trim(),
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists.",
            });
        }

        const newCategory = await Category.create({
            category: category.trim(),
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: newCategory,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create category.",
            error: error.message,
        });
    }
};

// =============================
// Get All Categories
// GET /api/category
// =============================
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            total: categories.length,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories.",
            error: error.message,
        });
    }
};

// =============================
// Get Single Category
// GET /api/category/:id
// =============================
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category.",
            error: error.message,
        });
    }
};

// =============================
// Update Category
// PUT /api/category/:id
// =============================
export const updateCategory = async (req, res) => {
    try {
        const { category } = req.body;

        if (!category || category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category title is required.",
            });
        }

        // Check duplicate (excluding current category)
        const duplicate = await Category.findOne({
            category: category.trim(),
            _id: { $ne: req.params.id },
        });

        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: "Category already exists.",
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                category: category.trim(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            data: updatedCategory,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update category.",
            error: error.message,
        });
    }
};

// =============================
// Delete Category
// DELETE /api/category/:id
// =============================
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete category.",
            error: error.message,
        });
    }
};