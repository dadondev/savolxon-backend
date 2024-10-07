/** @format */

import { Context } from "telegraf";
import tmeModel from "../../models/tme.model";
import bcrypt from "bcryptjs";
import saveToApp from "../functions/saveToApp";
const admins = ["5646140144"];

export async function isKnown(ctx: Context, next: () => Promise<void>) {
	const text = ctx.text;
	const telegramId = ctx.chat?.type === "private" ? ctx.chat.id : 100;
	let existUser = await tmeModel.findOne({ telegramId });
	if (existUser !== null && validator(existUser) === "ok") return await next();

	const disadvantagesOfUser = !existUser ? "ok" : validator(existUser);
	if (existUser && disadvantagesOfUser !== "ok" && text === "/start")
		return ctx.reply(message[disadvantagesOfUser]);
	if (!existUser)
		existUser = await tmeModel.create({
			action: "firstName",
			telegramId,
			isAdmin: admins.includes(telegramId + ""),
		});

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
			return ctx.reply(message.phoneNumber, {
				reply_markup: {
					one_time_keyboard: true,
					keyboard: [
						[
							{
								text: "📱 Telefon raqamni berish!",
								request_contact: true,
							},
						],
					],
				},
			});
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
			existUser.action = "start";
			await existUser.save();
			await saveToApp(new userDto(existUser));
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

export const message = {
	firstName: "Iltimos ismingizni kiriting!\n\nMasalan: Gulnora",
	lastName: "Iltimos familyangizni kiriting!\n\nMasalan: Axmedova",
	phoneNumber:
		"Iltimos telefon raqamingizni kiriting!\n\nPastdagi tugmani bosing!",
	password:
		"Iltimos parolingizni kiriting!\n\nParolda minimum 8 ta belgi qatnashga bo'lishi kerak! ",
	role: "Siz o'qituvchimisiz yoki o'quvchi?\n\nPastdagi tugmalar orqali tanlang!",
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

class userDto {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	password: string;
	action: string;
	telegramId: string;
	role: string;
	constructor(data: any) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.phoneNumber = data.phoneNumber;
		this.password = data.password;
		this.action = data.action;
		this.telegramId = data.telegramId;
		this.role = data.role;
	}
}
