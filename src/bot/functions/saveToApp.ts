/** @format */

import jwtDto from "../../dtos/jwt.dto";
import studentModel from "../../models/student.model";
import teacherModel from "../../models/teacher.model";
import { jwtSecret } from "../../utils/utils";
import { tmeUserValidationI } from "../types/types";
import jwt from "jsonwebtoken";

async function saveToApp(user: tmeUserValidationI) {
	if (user.role === "teacher") {
		try {
			const token = jwt.sign({ ...new jwtDto(user) }, jwtSecret, {
				expiresIn: 60 * 60 * 10,
			});
			const newTeacher = await teacherModel.create({ ...user, token });
		} catch (error) {
			console.log(error);
		} finally {
			return "ok";
		}
	} else {
		try {
			const newStudent = await studentModel.create(user);
		} catch (error) {
			console.log(error);
		} finally {
			return "ok";
		}
	}
}

export default saveToApp;
