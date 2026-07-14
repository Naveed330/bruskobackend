import About from "../../Modals/aboutModal/aboutModal.js";

export const getAboutDetails = async (req, res) => {
  try {
    const aboutDetails = await About.find();
    res.status(200).json(aboutDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};