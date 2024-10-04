/** @format */

import { Request, Response } from "express";
import testService from "../services/test.service";
import { editQuizI } from "../utils/types";
import decode from "../functions/decode";
import jwtDto from "../dtos/jwt.dto";
import sendToChatGPT from "../functions/sendtoai";
import pdfParse from "pdf-parse";
import testModel from "../models/test.model";
import { listTest } from "../dtos/test.dto";
import teacherModel from "../models/teacher.model";
import mammoth from "mammoth";

class testController {
	async getListTests(req: Request, res: Response) {
		try {
			if (!req.headers.authorization) throw new Error("Authorization failed");
			const payload: jwtDto = decode(req.headers.authorization);
			const datas = await testService.getListTests(payload);
			return res.json(datas);
		} catch (_) {
			console.log(_);
			return res.status(400).json({
				message: "Testlarni olishda muammo bo'ldi!",
			});
		}
	}
	async getOne(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const data = await testService.getOne(id);
			return res.json(data);
		} catch (_) {
			return res.status(400).json({
				message: "Testni olishda muammo bo'ldi!",
			});
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const data = await testService.delete(id);
			return res.json(data);
		} catch (_) {
			return res.status(400).json({
				message: "Testni olishda muammo bo'ldi!",
			});
		}
	}
	async edit(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const data = req.body;
			const test = await testService.edit(id, data);
			return res.json(test);
		} catch (error) {
			return res.status(400).json({
				message: "Testni olishda muammo bo'ldi!",
			});
		}
	}
	async create(req: Request, res: Response) {
		try {
			const payload = req.body;
			const resp = await testService.create(payload);
			return res.status(201).json(resp);
		} catch (error) {
			return res.status(400).json({
				message: "Testni yaratishdada muammo bo'ldi!",
			});
		}
	}
	async addQuiz(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const payload = req.body;
			const data = await testService.addQuiz(id, payload);
			return res.status(201).json(data);
		} catch (error) {
			return res.status(400).json({
				message: "Testni olishda muammo bo'ldi!",
			});
		}
	}
	async editQuiz(req: Request, res: Response) {
		try {
			const { testId, quizId } = req.params;
			const payload: editQuizI = req.body;
			const data = await testService.editQuiz(testId, quizId, payload);
			return res.json(data);
		} catch (error) {
			return res.status(400).json({
				message: (error as Error).message,
			});
		}
	}
	async deleteQuiz(req: Request, res: Response) {
		try {
			const { testId, quizId } = req.params;
			const data = await testService.deleteQuiz(testId, quizId);
			return res.json(data);
		} catch (error) {
			return res.status(400).json({
				message: "Testni olishda muammo bo'ldi!",
			});
		}
	}
	async uploadFile(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const test = await testModel.findById(id);
			if (!id || !test) throw new Error("Not found test");
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(400).send("No files were uploaded.");
			}
			const teacher = await teacherModel.findById(test.teacher_id);
			if (!teacher) throw new Error("Not found teacher");
			const file: unknown = req.files.file;
			const dataBuffer = (file as { data: any }).data;
			try {
				const isPDF =
					(file as { mimetype: string }).mimetype === "application/pdf";

				if (isPDF) {
					const parsedData = await pdfParse(dataBuffer);
					const response = await sendToChatGPT(parsedData.text);
					for (const variant of response.quizs) {
						test.quizs.push(variant);
					}
					await test.save();
				} else {
					const parsedData = await mammoth.extractRawText({
						buffer: dataBuffer.data,
					});
					const response = await sendToChatGPT(parsedData.value);
					for (const variant of response.quizs) {
						test.quizs.push(variant);
					}
					await test.save();
				}
				res.json(new listTest(test, teacher));
			} catch (err) {
				res
					.status(500)
					.send("Error processing the file: " + (err as Error).message);
			}
		} catch (error) {
			return res.status(400).json({
				message: "Faylni yuklashda muammo bo'ldi!",
			});
		}
	}
}

export default new testController();
