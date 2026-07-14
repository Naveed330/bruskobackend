import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [100, "Name cannot exceed 100 characters"],
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^[0-9]{7,15}$/,
                "Please enter a valid phone number",
            ],
        },

        leadStage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LeadStage",
            default: null,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Message cannot exceed 1000 characters"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Contact", contactSchema);
