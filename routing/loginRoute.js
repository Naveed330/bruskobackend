import express from "express";
import { get } from "http";
import { loginUser } from '../Controller/authController/loginController.js'
const loginRoutes = express.Router();

loginRoutes.post("/login", loginUser);


export default loginRoutes