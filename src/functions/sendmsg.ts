/** @format */

import { botToken } from "../utils/utils";

const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

async function sendMSG(text: string, userId: string) {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chat_id: userId,
			text,
		}),
	});
	const data = await response.json();
	return data.ok;
}
export default sendMSG;
