import mongoose from "mongoose";
import Contact from "../../Modals/contactModal/ContactUsModal.js";
import LeadStage from "../../Modals/leadstagesModal/leadsStagesModal.js";

export const changeLeadStage = async (req, res) => {
    try {
        const { leadId } = req.params;
        const { stageId } = req.body;

        console.log("Lead ID:", leadId);
        console.log("Stage ID:", stageId);

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(leadId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Lead ID",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(stageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Stage ID",
            });
        }

        // Check stage exists
        const stage = await LeadStage.findById(stageId);

        if (!stage || stage.isDeleted || !stage.status) {
            return res.status(404).json({
                success: false,
                message: "Lead stage not found.",
            });
        }

        // Check contact exists
        const lead = await Contact.findById(leadId);

        console.log("Lead Found:", lead);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found.",
            });
        }

        // Optional: if your Contact schema has isDeleted
        if (lead.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Lead has been deleted.",
            });
        }

        // Update stage
        lead.leadStage = stage._id;

        await lead.save();

        await lead.populate("leadStage");

        return res.status(200).json({
            success: true,
            message: "Lead stage updated successfully.",
            data: lead,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};