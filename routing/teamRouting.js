import express from "express";
import { createUser } from '../Controller/teamController.js'
import { getAllUsers } from '../Controller/getAllUsers.js'
import { deleteSingleUser } from '../Controller/deleteUser.js'
import {editSingleUser} from '../Controller/editUser.js'
import { get } from "http";
import upload from '../middleware/teamMiddleware.js'
const teamRoutes = express.Router();

// Define routes
teamRoutes.post("/createusers", upload.single("image"), createUser);
teamRoutes.get("/getusers", getAllUsers);
teamRoutes.delete("/delete-user/:id", deleteSingleUser);
teamRoutes.put("/update-user/:id", upload.single("image"), editSingleUser);

export default teamRoutes;