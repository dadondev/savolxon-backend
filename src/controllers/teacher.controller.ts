/** @format */

import { Request, Response } from "express";
import teacherService from "../services/teacher.service";

class teacherController {
	async getAll(_: Request, res: Response) {
		try {
			const resp = await teacherService.getAll();
			return res.json(resp);
		} catch (error) {
			return res
				.status(400)
				.json({ message: "O'qituvchilarni olishda muammo" });
		}
	}
	async create(req: Request, res: Response) {
		try {
			const payload = req.body;
			const teacher = await teacherService.create(payload);
			return res.status(201).json(teacher);
		} catch (error) {
			return res.status(400).json({ message: "O'qituvchi qo'shishda muammo" });
		}
	}
	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const payload = req.body;
			const teacher = await teacherService.update(id, payload);
			return res.status(200).json(teacher);
		} catch (error) {
			return res
				.status(400)
				.json({ message: "O'qituvchi tahrirlashda muammo" });
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const teacher = await teacherService.delete(id);
			return res.status(200).json(teacher);
		} catch (error) {
			return res.status(400).json({ message: "O'qituvchi o'chirishda muammo" });
		}
	}
	async updatePassword(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { password } = req.body;
			const resp = await teacherService.updatePassword(id, password);
			return res.json(resp);
		} catch (error) {
			return res.status(400).json({ message: "Parolni almashtirishda muammo" });
		}
	}
	async forgetPassword(req: Request, res: Response) {
		try {
			const { phoneNumber, telegramId } = req.body;
			const resp = await teacherService.forgetPassword(phoneNumber, telegramId);
			return res.json(resp);
		} catch (error) {
			return res.status(400).json({ message: "Parolni almashtirishda muammo" });
		}
	}
	async login(req: Request, res: Response) {
		try {
			const { phoneNumber, password } = req.body;
			const resp = await teacherService.login(phoneNumber, password);
			return res.json(resp);
		} catch (error) {
			return res.status(400).json({ message: "Parolni almashtirishda muammo" });
		}
	}
}

export default new teacherController();
