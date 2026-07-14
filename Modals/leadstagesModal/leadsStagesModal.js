import mongoose from "mongoose";

const leadStagesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Lead stage name is required"],
            trim: true,
            minlength: [2, "Lead stage name must be at least 2 characters"],
            maxlength: [100, "Lead stage name cannot exceed 100 characters"],
        },

        sortOrder: {
            type: Number,
            default: 0,
            min: [0, "Sort order cannot be negative"],
        },

        status: {
            type: Boolean,
            default: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Prevent duplicate names (case-insensitive)
leadStagesSchema.index(
    { name: 1 },
    {
        unique: true,
        collation: { locale: "en", strength: 2 },
    }
);

export default mongoose.model("LeadStage", leadStagesSchema);