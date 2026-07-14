import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: [true, "Role is Required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Role", roleSchema);