/** @format */

import { Context } from "telegraf";
import tmeModel from "../../models/tme.model";
import startKeys from "../keyboards/start";
import { message } from "../middlewares/isKnown";
import { adminKeys } from "../keyboards/admin";
import start from "../keyboards/start";

async function startCMD(ctx: Context) {
	try {
		const telegramId = ctx.chat!.id;
		const user = await tmeModel.findOne({ telegramId });
		const admin = user?.isAdmin;
		if (!user) throw new Error(message.error);
		user.action = "start";
		await user.save();
		return ctx.reply(
			`Assalomu alaykum, ${ctx.from?.first_name}!\n\nPlatformadan foydalanish uchun pastdagi tugmani bosing!`,
			{
				reply_markup: {
					inline_keyboard: admin ? [...start, adminKeys] : startKeys,
				},
			}
		);
	} catch (error) {
		return ctx.reply("Tizimda xatolik! Iltimos qayta urinib ko'ring!");
	}
}
export default startCMD;
