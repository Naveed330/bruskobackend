import mongoose from "mongoose";
import About from "../../Modals/aboutModal/aboutModal.js";

export const editAboutController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid About ID.",
      });
    }

    // Find About
    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About record not found.",
      });
    }

    // Update only provided fields
    if (title !== undefined) {
      about.title = title;
    }

    if (description !== undefined) {
      about.description = description;
    }

    if (image !== undefined) {
      about.image = image;
    }

    // Save updated document
    await about.save();

    return res.status(200).json({
      success: true,
      message: "About updated successfully.",
      data: about,
    });
  } catch (error) {
    console.error("Edit About Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};