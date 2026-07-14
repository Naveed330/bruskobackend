import Work from "../../Modals/workModal/WorkModal.js";

export const createWork = async (req, res) => {
  try {
    // Multer validation
    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        message: req.fileValidationError,
      });
    }

    // Uploaded files
    const uploadedImages =
      req.files?.map((file) => file.path) || [];

    const work = await Work.create({
      images: uploadedImages,
    });

    return res.status(201).json({
      success: true,
      message: "Work created successfully.",
      data: work,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};