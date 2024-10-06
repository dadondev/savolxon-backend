/** @format */

import { Context } from "telegraf";
import tmeModel from "../../models/tme.model";
import bcrypt from "bcryptjs";
import saveToApp from "../functions/saveToApp";
import { tmeUserValidationI } from "../types/types";

export async function isKnown(ctx: Context, next: () => Promise<void>) {
	const text = ctx.text;
	const telegramId = ctx.chat?.type === "private" ? ctx.chat.id : 100;
	let existUser = await tmeModel.findOne({ telegramId });
	if (existUser !== null && validator(existUser) === "ok") return await next();

	const disadvantagesOfUser = !existUser ? "ok" : validator(existUser);
	if (existUser && disadvantagesOfUser !== "ok" && text === "/start")
		return ctx.reply(message[disadvantagesOfUser]);
	if (!existUser)
		existUser = await tmeModel.create({ action: "firstName", telegramId });

	await existUser.save();
	if (text === "/start") {
		return ctx.reply(message.firstName);
	}

	if (!text) {
		return ctx.reply(message.error);
	}

	switch (existUser.action) {
		case "firstName":
			existUser.firstName = text;
			existUser.action = "lastName";
			await existUser.save();
			return ctx.reply(message.lastName);
		case "lastName":
			existUser.lastName = text;
			existUser.action = "phoneNumber";
			await existUser.save();
			return ctx.reply(message.phoneNumber);
		case "phoneNumber":
			existUser.phoneNumber = text;
			existUser.action = "password";
			await existUser.save();
			return ctx.reply(message.password);
		case "password":
			existUser.password = bcrypt.hashSync(text, 10);
			existUser.action = "role";
			await existUser.save();
			return ctx.reply(message.role, {
				reply_markup: {
					resize_keyboard: true,
					one_time_keyboard: true,
					keyboard: [
						[
							{
								text: "👨🏻‍🏫 O'qituvchi",
							},
							{
								text: "👨🏻‍🎓 O'quvchi",
							},
						],
					],
				},
			});
		case "role":
			existUser.role = text === "👨🏻‍🏫 O'qituvchi" ? "teacher" : "student";
			existUser.action = "role";
			await existUser.save();
			saveToApp(existUser as tmeUserValidationI);
			return ctx.reply(
				"✅ Muvaffaqiyatli tarzda ro'yhatdan o'tdingiz!\n\n/start buyrug'ini bosing!",
				{
					reply_markup: {
						remove_keyboard: true,
					},
				}
			);
		default:
			break;
	}
}

const message = {
	firstName: "Iltimos ismingizni kiriting!",
	lastName: "Iltimos familyangizni kiriting!",
	phoneNumber: "Iltimos telefon raqamingizni kiriting!",
	password: "Iltimos parolingizni kiriting!",
	role: "Siz o'qituvchimisiz yoki o'quvchi?",
	error: "Iltimos to'g'ri formatda kiriting!",
};

function validator(user: any) {
	const { firstName, lastName, phoneNumber, password, role } = user;
	if (!firstName) {
		return "firstName";
	}
	if (!lastName) {
		return "lastName";
	}
	if (!phoneNumber) return "phoneNumber";
	if (!password) return "password";
	if (!role) return "role";
	return "ok";
}
