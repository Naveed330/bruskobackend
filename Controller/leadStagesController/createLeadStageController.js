import LeadStage from '../../Modals/leadstagesModal/leadsStagesModal.js'

export const createLeadStage = async (req, res) => {
    try {
        let { name, sortOrder, status } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Lead stage name is required.",
            });
        }

        name = name.trim();

        const existingStage = await LeadStage.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
            isDeleted: false,
        });

        if (existingStage) {
            return res.status(409).json({
                success: false,
                message: "Lead stage already exists.",
            });
        }

        const leadStage = await LeadStage.create({
            name,
            sortOrder,
            status,
        });

        return res.status(201).json({
            success: true,
            message: "Lead stage created successfully.",
            data: leadStage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create lead stage.",
            error: error.message,
        });
    }
};

// Get API
export const getAllLeadStages = async (req, res) => {
    try {
        const leadStages = await LeadStage.find({
            isDeleted: false,
        }).sort({ sortOrder: 1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: leadStages.length,
            data: leadStages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch lead stages.",
            error: error.message,
        });
    }
};

// Updare API
export const updateLeadStage = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, sortOrder, status } = req.body;

        const leadStage = await LeadStage.findById(id);

        if (!leadStage || leadStage.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Lead stage not found.",
            });
        }

        if (name) {
            name = name.trim();

            const existing = await LeadStage.findOne({
                _id: { $ne: id },
                name: { $regex: new RegExp(`^${name}$`, "i") },
                isDeleted: false,
            });

            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: "Lead stage name already exists.",
                });
            }

            leadStage.name = name;
        }

        if (sortOrder !== undefined) {
            leadStage.sortOrder = sortOrder;
        }

        if (status !== undefined) {
            leadStage.status = status;
        }

        await leadStage.save();

        return res.status(200).json({
            success: true,
            message: "Lead stage updated successfully.",
            data: leadStage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update lead stage.",
            error: error.message,
        });
    }
};

// Delete API
export const deleteLeadStage = async (req, res) => {
    try {
        const { id } = req.params;

        const leadStage = await LeadStage.findById(id);

        if (!leadStage || leadStage.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Lead stage not found.",
            });
        }

        leadStage.isDeleted = true;

        await leadStage.save();

        return res.status(200).json({
            success: true,
            message: "Lead stage deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete lead stage.",
            error: error.message,
        });
    }
};