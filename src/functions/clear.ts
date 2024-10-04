/** @format */

import resultModel from "../models/result.model";
import studentModel from "../models/student.model";

async function clear(tests: any) {
	tests.forEach(async (test: any) => {
		test.members.forEach(async (member: any) => {
			const student = await studentModel.findById(member.studentId);
			if (!student) return;
			student.joined_tests = student.joined_tests.filter((e) => e !== test._id);
			await student.save();
		});
		const results = await resultModel.find({ testId: test._id });
		results.forEach(async (result) => {
			await resultModel.findByIdAndDelete(result._id);
		});
		await test.findByIdAndDelete(test._id);
		return;
	});
	return "ok";
}
export default clear;
