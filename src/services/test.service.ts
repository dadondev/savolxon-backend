/** @format */

import jwtDto from "../dtos/jwt.dto";
import TestDto, { listTest, SingleQuiz } from "../dtos/test.dto";
import getRandomEnterCode from "../functions/getEnterCode";
import teacherModel from "../models/teacher.model";
import testModel from "../models/test.model";
import { editQuizI } from "../utils/types";

class testService {
	async getListTests(payload: jwtDto) {
		try {
			const teacher = await teacherModel.findOne({
				phoneNumber: payload.phoneNumber,
			});
			if (!teacher) throw new Error("Failed");
			const tests = await testModel.find({ teacher_id: teacher._id });
			return tests.map((e) => new listTest(e, teacher));
		} catch (error) {
			throw error;
		}
	}
	async getOne(id: string) {
		try {
			const test = await testModel.findById(id);
			return new TestDto(test);
		} catch (error) {
			throw error;
		}
	}
	async delete(id: string) {
		try {
			const test = await testModel.findByIdAndDelete(id);
			const teacher = await teacherModel.findById(test?.teacher_id);
			return new listTest(test, teacher);
		} catch (error) {
			throw error;
		}
	}
	async edit(id: string, data: any) {
		try {
			const test = await testModel.findByIdAndUpdate(id, data, { new: true });
			const teacher = await teacherModel.findById(test?.teacher_id);
			return new listTest(test, teacher);
		} catch (error) {
			throw error;
		}
	}
	async create(data: any) {
		try {
			const randomCode = await getRandomEnterCode();
			const test = await testModel.create({
				...data,
				enterCode: randomCode,
			});
			const teacher = await teacherModel.findById(test?.teacher_id);
			return new listTest(test, teacher);
		} catch (error) {
			throw error;
		}
	}
	async addQuiz(id: string, data: any) {
		try {
			const test = await testModel.findById(id);
			if (!test) throw new Error("The test not found");
			test.quizs.push(data);
			await test.save();
			return new SingleQuiz(test.quizs[test.quizs.length - 1]);
		} catch (error) {
			throw error;
		}
	}
	async editQuiz(testId: string, quizId: string, data: editQuizI) {
		try {
			const test = await testModel.findById(testId);
			if (!test || test.quizs.length === 0)
				throw new Error("The test not found");
			let quiz = test.quizs.find((e) => e._id.toString() === quizId);
			if (!quiz) throw new Error("The quiz not found");
			test.quizs = test.quizs.map((e) =>
				e._id.toString() === quizId ? { ...e, ...data } : e
			) as any;
			await test.save();
			return new SingleQuiz({ ...quiz, ...data });
		} catch (error) {
			throw error;
		}
	}
	async deleteQuiz(testId: string, quizId: string) {
		try {
			const test = await testModel.findById(testId);
			if (!test || test.quizs.length === 0)
				throw new Error("The test not found");
			test.quizs = test.quizs.filter(
				(quiz) => quiz._id.toString() !== quizId
			) as any;
			await test.save();
			return { message: "The test deleted successfully" };
		} catch (error) {
			throw error;
		}
	}
}

export default new testService();
