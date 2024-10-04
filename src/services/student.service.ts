/** @format */

import studentDto from "../dtos/student.dto";
import studentModel from "../models/student.model";

class studentService {
	async create(payload: any) {
		try {
			const student = await studentModel.create(payload);
			return new studentDto(student);
		} catch (error) {
			throw error;
		}
	}
	async edit(id: string, payload: any) {
		try {
			const student = await studentModel.findByIdAndUpdate(id, payload, {
				new: true,
			});
			return new studentDto(student);
		} catch (error) {
			throw error;
		}
	}
	async delete(id: string) {
		try {
			const student = await studentModel.findByIdAndDelete(id);
			return new studentDto(student);
		} catch (error) {
			throw error;
		}
	}
	async getAll() {
		try {
			const students = await studentModel.find();
			return students.map((e) => new studentDto(e));
		} catch (error) {
			throw error;
		}
	}
	async getOne(id: string) {
		try {
			const student = await studentModel.findById(id);
			return new studentDto(student);
		} catch (error) {
			throw error;
		}
	}
}

export default new studentService();
