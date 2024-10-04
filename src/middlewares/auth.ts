/** @format */

import { NextFunction, Request, Response } from "express";
import decode from "../functions/decode";
import teacherModel from "../models/teacher.model";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization;
		if (!token) throw new Error("Failed");
		const teacher = decode(token);
		const existTeacher = await teacherModel.findOne({
			phoneNumber: teacher.phoneNumber,
		});
		if (!existTeacher) throw new Error("failed");
		return next();
	} catch (error) {
		return res.status(400).json({ message: "Authorization failed!" });
	}
}

export default authMiddleware;
