/** @format */

import { Context } from "telegraf";

async function startCMD(ctx: Context) {
	return ctx.reply(
		`Assalomu alaykum, ${ctx.from?.first_name}!\n\nPlatformadan foydalanish uchun pastdagi tugmani bosing!`,
		{
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Platformaga kirish",
							url: "https://savolxon.vercel.app",
						},
					],
				],
			},
		}
	);
}
export default startCMD;
