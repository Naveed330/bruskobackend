import About from "../../Modals/aboutModal/aboutModal.js";

export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "About ID is required.",
      });
    }

    // Find and delete the document
    const deletedAbout = await About.findByIdAndDelete(id);

    // Check if document exists
    if (!deletedAbout) {
      return res.status(404).json({
        success: false,
        message: "About record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "About deleted successfully.",
      data: deletedAbout,
    });
  } catch (error) {
    console.error("Delete About Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};