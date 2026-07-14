import Work from "../../Modals/workModal/WorkModal.js";

export const deleteWork = async (req, res) => {
  try {
    const { workId, imageIndex } = req.params;

    const work = await Work.findById(workId);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work not found",
      });
    }

    const index = Number(imageIndex);

    if (
      isNaN(index) ||
      index < 0 ||
      index >= work.images.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid image index",
      });
    }

    work.images.splice(index, 1);

    if (work.images.length === 0) {
      await Work.findByIdAndDelete(workId);

      return res.status(200).json({
        success: true,
        message: "Last image deleted. Work removed successfully.",
      });
    }

    await work.save();

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: work,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};