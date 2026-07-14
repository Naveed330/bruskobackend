import Service from "../../Modals/servicseCategoryModal/servicesModal.js";

export const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);

        if (!deletedService) {
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};