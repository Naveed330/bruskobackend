import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
        title: {
            type: String,
            required: [true, "Service title is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Service description is required"],
            trim: true,
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },

        discount_price: {
            type: Number,
            default: 0,
            min: [0, "Discount price cannot be negative"],
            validate: {
                validator: function (value) {
                    return value <= this.price;
                },
                message: "Discount price cannot be greater than price",
            },
        },

        image: {
            type: String,
            required: [true, "Service image is required"],
            trim: true,
        },

        discount_title: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Service", servicesSchema);