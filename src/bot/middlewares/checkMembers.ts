/** @format */

import { Context } from "telegraf";

const channelIds = ["@savolxonn", "@dadonde"];
export const checkMembership = async (
	ctx: Context,
	next: () => Promise<void>
) => {
	try {
		const result = await examine(ctx);
		if (!result) {
			return await ctx.reply(
				`Platformadan foydalanish uchun quyidagi kanallarga a'zo bo'ling! Va qayta /start ni bosing!`,
				{
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "1-kanal",
									url: `https://t.me/${channelIds[0].replace("@", "")}`,
								},
							],
							[
								{
									text: "2-kanal",
									url: `https://t.me/${channelIds[1].replace("@", "")}`,
								},
							],
						],
					},
				}
			);
		}
		await next();
	} catch (error) {
		console.log(error);

		return ctx.reply(
			"Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring."
		);
	}
};

async function examine(ctx: Context) {
	let userJoin = true;
	const userId = ctx.from?.id;

	for (const channelId of channelIds) {
		const chatMember = await ctx.telegram.getChatMember(channelId, userId!);
		const isNotJoin =
			chatMember.status === "left" ||
			chatMember.status === "kicked" ||
			chatMember.status === "restricted";

		if (isNotJoin) {
			userJoin = false;
		}
		continue;
	}
	return userJoin;
}
