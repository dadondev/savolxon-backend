/** @format */

import express from "express";
import teacherController from "../controllers/teacher.controller";
import authMiddleware from "../middlewares/auth";
const teacherRoutes = express.Router();

teacherRoutes.get("/getall", authMiddleware, teacherController.getAll);
teacherRoutes.post("/create", teacherController.create);
teacherRoutes.put("/update/:id", authMiddleware, teacherController.update);
teacherRoutes.delete("/delete/:id", authMiddleware, teacherController.update);
teacherRoutes.put(
	"/updatepassword/:id",
	authMiddleware,
	teacherController.updatePassword
);
teacherRoutes.patch("/forget", teacherController.forgetPassword);
teacherRoutes.post("/login", teacherController.login);

export default teacherRoutes;
