/** @format */

import { Context } from "telegraf";
import { message } from "../middlewares/isKnown";
import tmeModel from "../../models/tme.model";
import startKeys from "../keyboards/start";
import { adminKeys } from "../keyboards/admin";

async function backAction(ctx: Context) {
	try {
		const telegramId = ctx.chat!.id;
		const existUser = await tmeModel.findOne({ telegramId });
		if (!existUser) throw new Error(message.error);
		const admin = existUser.isAdmin;
		existUser.action = "start";
		await existUser.save();
		return await ctx.editMessageText(
			`Assalomu alaykum, ${ctx.from?.first_name}!\n\nPlatformadan foydalanish uchun pastdagi tugmani bosing!`,
			{
				reply_markup: {
					inline_keyboard: admin ? [...startKeys, adminKeys] : startKeys,
				},
			}
		);
	} catch (error) {
		return await ctx.reply(message.error);
	}
}

export default backAction;
