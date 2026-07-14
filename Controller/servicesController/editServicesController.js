import Service from "../../Modals/servicseCategoryModal/servicesModal.js";
import cloudinary from "../../config/cloudinary.js";

export const updateService = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            discount_price,
            discount_title,
        } = req.body || {};

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }

        // Check duplicate title
        if (title && title.trim() !== service.title) {
            const existingService = await Service.findOne({
                title: title.trim(),
                _id: { $ne: req.params.id },
            });

            if (existingService) {
                return res.status(409).json({
                    success: false,
                    message: "Another service with this title already exists.",
                });
            }
        }

        // Upload new image if provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "services",
            });

            service.image = result.secure_url;
        }

        if (title) service.title = title.trim();
        if (description) service.description = description;
        if (price !== undefined) service.price = price;
        if (discount_price !== undefined)
            service.discount_price = discount_price;
        if (discount_title !== undefined)
            service.discount_title = discount_title;

        await service.save();

        return res.status(200).json({
            success: true,
            message: "Service updated successfully.",
            data: service,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};