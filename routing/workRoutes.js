import express from "express";
import { get } from "http";
const workRoutes = express.Router();
import upload from '../middleware/teamMiddleware.js'
import { getWork } from '../Controller/workController/workGallery.js'
import { createWork } from '../Controller/workController/createWork.js'
import { deleteWork } from '../Controller/workController/deleteWork.js'

workRoutes.post("/create-work", upload.array("images", 8), createWork);
workRoutes.get("/work-gallery", getWork);
workRoutes.delete("/work/:workId/:imageIndex", deleteWork);

export default workRoutes;