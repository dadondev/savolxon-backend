/** @format */

import { Request, Response } from "express";
import enterService from "../services/enter.service";
import { enterTestI } from "../utils/types";

class enterController {
	async enter(req: Request, res: Response) {
		try {
			const payload: enterTestI = req.body;
			const data = await enterService.enter(payload);
			return res.json(data);
		} catch (error) {
			return res.status(400).json("Testga kirishda xatolik yuz berdi!");
		}
	}
	async finished(req: Request, res: Response) {
		try {
			const payload = req.body;
			const resp = await enterService.finished(payload);
			return res.json(resp);
		} catch (error) {
			return res.status(400).json("Testga kirishda xatolik yuz berdi!");
		}
	}
}

export default new enterController();
