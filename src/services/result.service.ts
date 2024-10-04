/** @format */

import resultDto from "../dtos/result.dto";
import resultModel from "../models/result.model";

class resultService {
	async getAll() {
		try {
			const allResults = await resultModel.find();
			return allResults.map((e) => new resultDto(e));
		} catch (error) {
			throw error;
		}
	}
	async getOne(id: string) {
		try {
			const result = await resultModel.findById(id);
			if (!result) throw new Error("Natija topilmadi");
			return new resultDto(result);
		} catch (error) {
			throw error;
		}
	}
	async delete(id: string) {
		try {
			const result = await resultModel.findById(id);
			if (!result) throw new Error("Natija topilmadi");
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
