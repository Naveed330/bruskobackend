import About from "../../Modals/aboutModal/aboutModal.js";

export const createAbout = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Get image URL from Cloudinary
    const image = req.file ? req.file.path : "";

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required.",
      });
    }

    const about = await About.create({
      title: title.trim(),
      description: description.trim(),
      image,
    });

    return res.status(201).json({
      success: true,
      message: "About created successfully.",
      data: about,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};