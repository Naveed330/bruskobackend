import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, "Category title is required"],
            trim: true,
            unique: true,
            minlength: [2, "Category title must be at least 2 characters"],
            maxlength: [100, "Category title cannot exceed 100 characters"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Category", categorySchema);