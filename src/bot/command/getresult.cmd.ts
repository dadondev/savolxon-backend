/** @format */

import { Context } from "telegraf";
import tmeModel from "../../models/tme.model";
import testModel from "../../models/test.model";
import resultModel from "../../models/result.model";
import resultDto from "../../dtos/result.dto";
import studentModel from "../../models/student.model";

async function getResultCMD(ctx: Context) {
	const telegramId = ctx.chat?.id;
	const user = await tmeModel.findOne({ telegramId });
	if (!user) return;
	user.action = "getresult";
	await user.save();
	return ctx.reply("Testning kodini kiriting!");
}

export default getResultCMD;

export async function handleCode(ctx: Context, next: () => Promise<void>) {
	const telegramId = ctx.chat?.id;
	const enterCode = ctx.text;
	const user = await tmeModel.findOne({ telegramId });
	if (!user || user.action !== "getresult") return await next();
	try {
		const existTest = await testModel.findOne({ enterCode });
		if (!existTest) throw new Error("test topilmadi");
		const existResult = await resultModel.find({
			testId: existTest._id.toString(),
		});
		if (!existResult) throw new Error("test topilmadi");
		const resultsList = existResult
			.filter((e) => e.solved.length === 0)
			.map((e) => new resultDto(e))
			.sort((a, b) => a.wrongs - b.wrongs);

		if (resultsList.length === 0)
			return ctx.reply("Natijalar hozircha mavjud emas!");

		const rating = resultsList
			.map(async (e, i) => {
				const student = await studentModel.findById(e.userId);
				if (!student) return "";

				return `\n${i + 1}. ${student.lastName} ${student.firstName} ✅${
					e.corrects
				} ❌${e.wrongs}`;
			})
			.join("");
		return ctx.reply(`Quyidagi test bo'yicha natijalar!\n${rating}`);
	} catch (error) {
		return ctx.reply("❌ Test topilmadi!");
	}
}
