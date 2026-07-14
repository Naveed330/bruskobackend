import Work from "../../Modals/workModal/WorkModal.js";

export const getWork = async (req, res) => {
  try {
    const work = await Work.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: work,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};