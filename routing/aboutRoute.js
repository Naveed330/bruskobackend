import express from "express";
import { get } from "http";
const aboutRoutes = express.Router();
import upload from '../middleware/teamMiddleware.js'
import { getAboutDetails } from '../Controller/aboutController/getAboutDetails.js'
import { createAbout } from '../Controller/aboutController/aboutController.js'
import { deleteAbout } from '../Controller/aboutController/aboutDeleteController.js'
import { editAboutController } from '../Controller/aboutController/aboutEditController.js'

aboutRoutes.post("/create-about", upload.single("image"), createAbout);
aboutRoutes.get("/about-details", getAboutDetails);
aboutRoutes.delete("/delete-about/:id", deleteAbout);
aboutRoutes.put("/edit-about/:id", editAboutController);

export default aboutRoutes;