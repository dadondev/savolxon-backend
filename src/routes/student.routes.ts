/** @format */

import express from "express";
import studentController from "../controllers/student.controller";
const studentRoutes = express.Router();

studentRoutes.get("/getall", studentController.getAll);
studentRoutes.get("/getone/:id", studentController.getOne);
studentRoutes.post("/create", studentController.create);
studentRoutes.put("/edit/:id", studentController.edit);
studentRoutes.delete("/delete/:id", studentController.delete);

export default studentRoutes;
