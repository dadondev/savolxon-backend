/** @format */

import { Context } from "telegraf";
import tmeModel from "../../models/tme.model";
import { message } from "../middlewares/isKnown";
import back from "../keyboards/back";

async function sendMsgToUsers(ctx: Context) {
	try {
		const telegramId = ctx.chat!.id;
		const existUser = await tmeModel.findOne({ telegramId });
		if (!existUser) throw new Error(message.error);
		existUser.action = "sendMsgToUsers";
		await existUser.save();
		return await ctx.reply("Habar matnini kiriting!", {
			reply_markup: {
				inline_keyboard: [back],
			},
			parse_mode: "MarkdownV2",
		});
	} catch (error) {
		return await ctx.reply(message.error);
	}
}

export default sendMsgToUsers;
