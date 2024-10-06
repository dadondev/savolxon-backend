/** @format */

import jwtDto from "../dtos/jwt.dto";
import teacherDto from "../dtos/teacher.dto";
import clear from "../functions/clear";
import teacherModel from "../models/teacher.model";
import testModel from "../models/test.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/utils";
import { getCode } from "../functions/getEnterCode";
import smsService from "./sms.service";
import sendMSG from "../functions/sendmsg";

class teacherService {
	async create(payload: any) {
		try {
			payload.password = bcrypt.hashSync(payload.password, 10);
			payload.token = jwt.sign({ ...new jwtDto(payload) }, jwtSecret, {
				expiresIn: "10h",
			});
			const teacher = await teacherModel.create(payload);
			return new teacherDto(teacher);
		} catch (error) {
			throw error;
		}
	}
	async update(id: string, payload: any) {
		try {
			const teacher = await teacherModel.findByIdAndUpdate(id, payload);
			return new teacherDto(teacher);
		} catch (error) {
			throw error;
		}
	}
	async delete(id: string) {
		try {
			const teacher = await teacherModel.findById(id);
			if (!teacher) throw new Error("O'qituvchi topilmadi!");
			const tests = await testModel.find({ teacher_id: teacher._id as any });
			await clear(tests);
			return { message: "Test o'chirib tashlandi!" };
		} catch (error) {
			throw error;
		}
	}
	async getAll() {
		try {
			const teachers = await teacherModel.find();
			return teachers.map((e) => new teacherDto(e));
		} catch (error) {
			throw error;
		}
	}
	async updatePassword(id: string, payload: string) {
		try {
			const hashedPassword = bcrypt.hashSync(payload);
			const teacher = await teacherModel.findByIdAndUpdate(id, {
				password: hashedPassword,
			});
			return new teacherDto(teacher);
		} catch (error) {
			throw error;
		}
	}
	async forgetPassword(phoneNumber: string, telegramId: string) {
		try {
			const teacher = await teacherModel.findOne({ phoneNumber });
			if (!teacher) throw new Error("O'qituvchi topilmadi!");
			const random = getCode() + "";
			const hashedPassword = bcrypt.hashSync(random, 10);
			teacher.password = hashedPassword;
			const msg = `Assalomu alaykum ${teacher.firstName}!\n\nSizning yangi parolingiz: ${random}`;
			await teacher.save();
			if (telegramId) await sendMSG(msg, telegramId);
			await smsService.forgotPassword(teacher.phoneNumber, random);
			return new teacherDto(teacher);
		} catch (error) {
			throw error;
		}
	}
	async login(phoneNumber: string, password: string) {
		try {
			const teacher = await teacherModel.findOne({ phoneNumber });
			if (!teacher) throw new Error("O'qituvchi topilmadi");
			const passwordsSame = bcrypt.compareSync(password, teacher.password);
			if (!passwordsSame) throw new Error("Parol mos emas!");
			teacher.token = jwt.sign({ ...new jwtDto(teacher) }, jwtSecret, {
				expiresIn: "10h",
			});
			await teacher.save();
			return new teacherDto(teacher);
		} catch (error) {
			throw error;
		}
	}
}
export default new teacherService();
