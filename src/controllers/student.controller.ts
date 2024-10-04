/** @format */

import { Request, Response } from "express";
import studentService from "../services/student.service";

class studentController {
	async create(req: Request, res: Response) {
		try {
			const payload = req.body;
			const resp = await studentService.create(payload);
			return res.status(201).json(resp);
		} catch (error) {
			return res.status(400).json({ error: "O'quvchini qo'shishda xatolik!" });
		}
	}
	async edit(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const payload = req.body;
			const resp = await studentService.edit(id, payload);
			return res.json(resp);
		} catch (error) {
			return res
				.status(400)
				.json({ error: "O'quvchini tahrirlashda xatolik!" });
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const resp = await studentService.delete(id);
			return res.json(resp);
		} catch (error) {
			return res.status(400).json({ error: "O'quvchini o'chirishda xatolik!" });
		}
	}
	async getAll(req: Request, res: Response) {
		try {
			const resp = await studentService.getAll();
			return res.json(resp);
		} catch (error) {
			return res.status(400).json({ error: "O'quvchini olishda xatolik!" });
		}
	}
	async getOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const resp = await studentService.getOne(id);
			return res.json(resp);
		} catch (error) {
			return res.status(400).json({ error: "O'quvchini olishda xatolik!" });
		}
	}
}

export default new studentController();
