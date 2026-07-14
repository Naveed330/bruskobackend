import express from "express";
import { get } from "http";
const serviceRoutes = express.Router();
import upload from '../middleware/teamMiddleware.js'
import { createServices } from '../Controller/servicesController/createServicesController.js'
import { getAllServices } from "../Controller/servicesController/getServicesController.js";
import { deleteService } from "../Controller/servicesController/deleteServicesController.js";
import { updateService } from "../Controller/servicesController/editServicesController.js";

serviceRoutes.post("/create-service", upload.single("image"), createServices);
serviceRoutes.get("/get-services", getAllServices);
serviceRoutes.delete("/delete-services/:id", deleteService);
serviceRoutes.put("/edit-services/:id", upload.single("image"), updateService);

export default serviceRoutes;