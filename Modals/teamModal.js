import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"],
            trim: true,
        },

        designation: {
            type: String,
            required: [true, "Designation is Required"],
            trim: true,
        },

        hire_date: {
            type: Date,
            required: [true, "Hire Date is Required"],
        },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: [true, "Role is Required"],
        },

        experience: {
            type: String,
            required: [true, "Experience is Required"],
            trim: true,
        },

        skills: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length <= 3;
                },
                message: "Maximum 3 Skills are Allowed.",
            },
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

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);