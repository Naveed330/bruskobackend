import express from "express";
import { get } from "http";
import { createCategory, getAllCategories, deleteCategory, updateCategory } from '../Controller/categoryController/createCategoryController.js'
const categoryRoutes = express.Router();

categoryRoutes.post("/create-category", createCategory);
categoryRoutes.get("/get-all-category", getAllCategories);
categoryRoutes.delete("/delete-category/:id", deleteCategory);
categoryRoutes.put("/edit-category/:id", updateCategory);

export default categoryRoutes