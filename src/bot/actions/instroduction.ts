/** @format */

import { Context } from "telegraf";
import tmeModel from "../../models/tme.model";
import back from "../keyboards/back";
import instroductionKeys from "../keyboards/instroduction";

const instroductionAction = async (ctx: Context, next: () => Promise<void>) => {
	const telegramId = ctx.chat!.id;
	const existUser = await tmeModel.findOne({ telegramId });
	existUser!.action = "instroduction";
	ctx.editMessageText("Sizga kerak bo'lishi mumkin bo'lgan qo'llanmalar!", {
		reply_markup: {
			inline_keyboard: [instroductionKeys, back],
		},
	});
	await existUser!.save();
	return await next();
};

export default instroductionAction;
