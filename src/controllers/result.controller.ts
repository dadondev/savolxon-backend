/** @format */

import { Request, Response } from "express";
import resultService from "../services/result.service";

class resultController {
	async getAll(req: Request, res: Response) {
		try {
			const datas = await resultService.getAll();
			return res.json(datas);
		} catch (error) {
			return res.status(400).json({
				message: "Natijalarni olishda xatolik!",
			});
		}
	}
	async getOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const datas = await resultService.getOne(id);
			return res.json(datas);
		} catch (error) {
			return res.status(400).json({
				message: "Natijalarni olishda xatolik!",
			});
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const datas = await resultService.delete(id);
			return res.json(datas);
		} catch (error) {
			return res.status(400).json({
				message: "Natijalarni olishda xatolik!",
			});
		}
	}
	async edit(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const body = req.body;
			const datas = await resultService.edit(id, body);
			return res.json(datas);
		} catch (error) {
			return res.status(400).json({
				message: "Natijalarni olishda xatolik!",
			});
		}
	}
	async create(req: Request, res: Response) {
		try {
			const payload = req.body;
			const data = await resultService.create(payload);
			return res.status(201).json(data);
		} catch (error) {
			return res.status(400).json({
				message: "Natijalarni olishda xatolik!",
			});
		}
	}
}

export default new resultController();