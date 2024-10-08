/** @format */

import enterDto from "../dtos/enter.dto";
import resultDto from "../dtos/result.dto";
import compareResult from "../functions/compare";
import sendMSG from "../functions/sendmsg";
import sendsms from "../functions/sendsms";
import resultModel from "../models/result.model";
import studentModel from "../models/student.model";
import testModel from "../models/test.model";
import { enterTestI, resultsTestI } from "../utils/types";

class enterService {
	async enter(payload: enterTestI) {
		try {
			const { phoneNumber, testCode } = payload;
			if (phoneNumber.length === 0 || testCode.length === 0)
				throw new Error("Iltimos malumotlarni to'liq kiriting!");
			const test = await testModel.findOne({ enterCode: testCode });
			const student = await studentModel.findOne({ phoneNumber });

			if (!test) throw new Error("Test not found");

			if (!student) throw new Error("Student not found");

			const joinFound = student.joined_tests.find(
				(e) => e === test._id.toString()
			);
			const mbrFound = test.members.find(
				(e) => e.studentId.toString() === student._id.toString()
			);

			if (mbrFound) throw new Error("You are already finished");
			if (joinFound) throw new Error("You are already finished");

			return new enterDto(test);
		} catch (error) {
			throw error;
		}
	}
	async finished(payload: resultsTestI) {
		try {
			const comparedResult = await compareResult(payload);
			const student = await studentModel.findOne({
				phoneNumber: comparedResult.phoneNumber,
			});
			if (!student) throw new Error("The user not found");
			const result = await resultModel.create({
				...comparedResult,
				userId: student!._id.toString(),
			});
			const test = await testModel.findById(comparedResult.testId);

			if (!test) throw new Error("Test topilmadi");
			student?.joined_tests.push(test._id.toString());
			const newMbr = {
				phoneNumber: student?.phoneNumber,
				studentId: result.userId,
				resultId: result._id,
				status: "finished",
			};
			test.members.push(newMbr);
			await test.save();
			await student?.save();
			await result.save();

			let msg = `Assalomu alaykum, ${student.firstName}\nSizning ${test.name} nomli testdan olgan natijalaringiz!\n🔄Jami savollar soni:${comparedResult.allQuizsCount} ta\n❌Noto'g'ri javoblar soni:${comparedResult.wrongs} ta\n✅To'gri javoblar soni:${comparedResult.corrects} ta\n\nKeyingi testlarda omad tilaymiz!`;
			if (comparedResult.telegramId)
				await sendMSG(msg, comparedResult.telegramId);
			await sendsms(student!.phoneNumber, msg);
			return new resultDto(result);
		} catch (error) {
			throw error;
		}
	}
	async edit(id: string, payload: any) {
		try {
			const result = await resultModel.findByIdAndUpdate(id, payload, {
				new: true,
			});
			return new resultDto(result);
		} catch (error) {
			throw error;
		}
	}
	async delete(id: string) {
		try {
			const result = await resultModel.findByIdAndDelete(id);
			if (!result) throw new Error("Natija topilmadi!");
			const student = await studentModel.findById(result.userId);
			const test = await testModel.findById(result.testId);
			student!.joined_tests = student!.joined_tests.filter(
				(e) => e.toString() !== result.testId.toString()
			);
			test!.members = test!.members.filter(
				(e) => e.studentId.toString() !== result.userId.toString()
			) as any;
			await test?.save();
			await student?.save();
			return { message: "Natijalar o'chirib tashlandi!" };
		} catch (error) {
			throw error;
		}
	}
}

export default new enterService();
