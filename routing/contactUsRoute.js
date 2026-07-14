import express from "express";
import { get } from "http";
import { createContact, getAllContacts } from "../Controller/contactController/createContact.js";
import { changeLeadStage } from "../Controller/leadStagesController/changeLeadsStageController.js";
const contactUsRoutes = express.Router();

contactUsRoutes.post("/create-contact", createContact);
contactUsRoutes.get("/get-all-contact", getAllContacts);
contactUsRoutes.put("/change-stage/:leadId", changeLeadStage);

export default contactUsRoutes;
