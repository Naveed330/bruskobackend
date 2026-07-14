import Service from "../../Modals/servicseCategoryModal/servicesModal.js";

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate("category").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: services.length,
            data: services,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};