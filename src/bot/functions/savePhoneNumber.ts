/** @format */

import { Context, NarrowedContext } from "telegraf";
import tmeModel from "../../models/tme.model";
import { Update, Message } from "telegraf/typings/core/types/typegram";
import { message } from "../middlewares/isKnown";

export async function savePhoneNumber(
	ctx: NarrowedContext<
		Context<Update>,
		{
			message: Update.New & Update.NonChannel & Message.ContactMessage;
			update_id: number;
		}
	>
) {
	try {
		const telegramId = ctx.chat!.id;
		const phone = ctx.message.contact.phone_number;
		const existUser = await tmeModel.findOne({ telegramId });
		if (!existUser) return await ctx.reply(message.error);
		if (existUser.action !== "phoneNumber")
			return await ctx.reply(message.error);
		existUser.phoneNumber = phone;
		existUser.action = "password";
		await existUser.save();
		return await ctx.reply(message.password, {
			reply_markup: {
				remove_keyboard: true,
			},
		});
	} catch (error) {
		return ctx.reply("Xatolik yuz berdi! Qayta urinib ko'ring!");
	}
}
