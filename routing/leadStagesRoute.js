import express from "express";
import { get } from "http";
import { createLeadStage, deleteLeadStage, getAllLeadStages, updateLeadStage } from "../Controller/leadStagesController/createLeadStageController.js";
const leadStageRoutes = express.Router();

leadStageRoutes.post("/create-lead-stage", createLeadStage)
leadStageRoutes.get("/get-lead-stage", getAllLeadStages)
leadStageRoutes.put("/update-lead-stage/:id", updateLeadStage)
leadStageRoutes.delete("/delete-lead-stage/:id", deleteLeadStage)

export default leadStageRoutes;