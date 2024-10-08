/** @format */

import { Context } from "telegraf";
import tmeModel from "../../models/tme.model";
import testModel from "../../models/test.model";
import teacherModel from "../../models/teacher.model";
import studentModel from "../../models/student.model";
import resultModel from "../../models/result.model";
import back from "../keyboards/back";

async function getStatistics(ctx: Context) {
	const telegramId = ctx.chat!.id;
	try {
		const existUser = await tmeModel.findOne({ telegramId });
		if (!existUser) throw new Error("Xatolik yuzberdi");
		const isAdmin = existUser.isAdmin;
		if (!isAdmin) throw new Error("You aren't admin");
		const tests = await testModel.find();
		const tmeUsers = await tmeModel.find();
		const teachers = await teacherModel.find();
		const students = await studentModel.find();
		const results = await resultModel.find();
		const messageForAdmin = `Ayni paytda!\n\nFoydalanuchilar soni:${tmeUsers.length}\nO'qituvchilar soni: ${teachers.length}\nO'quvchilar soni: ${students.length}\n\nTestlar soni:${tests.length}\nNatijalar soni: ${results.length}`;

		return await ctx.editMessageText(messageForAdmin, {
			reply_markup: {
				inline_keyboard: [back],
			},
		});
	} catch (error) {
		return await ctx.reply("Xatolik yuz berdi!");
	}
}

export default getStatistics;
