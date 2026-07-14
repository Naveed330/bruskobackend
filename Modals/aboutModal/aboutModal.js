import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is Required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is Required"],
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("About", aboutSchema);