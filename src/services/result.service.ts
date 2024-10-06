/** @format */

import resultDto from "../dtos/result.dto";
import resultModel from "../models/result.model";
import teacherModel from "../models/teacher.model";
import testModel from "../models/test.model";

class resultService {
	async getAll(teacher: string) {
		try {
			const allResults = await resultModel.find();
			const datas = allResults.filter(async (e) => {
				const testId = await testModel.findById(e.testId);
				if (!testId) return false;
				if (testId.teacher_id.toString() !== teacher) return false;
				return true;
			});
			return datas.map((e) => new resultDto(e));
		} catch (error) {
			throw error;
		}
	}
	async getOne(id: string, teacher: string) {
		try {
			const result = await resultModel.findById(id);
			if (!result) throw new Error("Natija topilmadi");
			const test = await testModel.findById(result.testId);
			if (!test) throw new Error("Cannot get");
			if (test.teacher_id.toString() !== teacher) throw new Error("Cannot get");
			return new resultDto(result);
		} catch (error) {
			throw error;
		}
	}
	async delete(id: string, teacher: string) {
		try {
			const result = await resultModel.findById(id);
			if (!result) throw new Error("Natija topilmadi");
			const test = await testModel.findById(result.testId);
			if (!test) throw new Error("Cannot get");
			const teacher = await teacherModel.findById(test.teacher_id);
			if (!teacher) throw new Error("Cannot get");
			await resultModel.findByIdAndDelete(id);
			return new resultDto(result);
		} catch (error) {
			throw error;
		}
	}
	async edit(id: string, data: any) {
		try {
			const result = await resultModel.findByIdAndUpdate(id, data);
			return new resultDto(result);
		} catch (error) {
			throw error;
		}
	}
	async create(payload: any) {
		try {
			const result = await resultModel.create(payload);
			return new resultDto(result);
		} catch (error) {
			throw error;
		}
	}
}
export default new resultService();
