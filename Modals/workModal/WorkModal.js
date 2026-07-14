import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Work", workSchema);