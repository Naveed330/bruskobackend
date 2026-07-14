import express from "express";
import { get } from "http";
const roleRoutes = express.Router();
import { createRole, getAllRoles, deleteRole, updateRole } from '../Controller/roleController/CreateRoleController.js'

roleRoutes.post("/create", createRole);
roleRoutes.get("/allRoles", getAllRoles);
roleRoutes.delete("/delete/:id", deleteRole);
roleRoutes.put("/update/:id", updateRole);

export default roleRoutes;