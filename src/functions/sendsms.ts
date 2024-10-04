/** @format */

import { textFlowToken } from "../utils/utils";

async function sendsms(phone_number: string, text: string) {
	const resp = await fetch("https://textflow.me/api/send-sms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + textFlowToken,
		},
		body: JSON.stringify({ phone_number, text }),
	});
	if (!resp.ok) return "error";
	return "success";
}

export default sendsms;
