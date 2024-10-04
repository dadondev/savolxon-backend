/** @format */

import sendsms from "../functions/sendsms";

class smsService {
	async forgotPassword(phone_number: string, password: string) {
		let isEndSuccess = true;
		while (isEndSuccess) {
			const resp = await sendsms(
				phone_number,
				`Sizning yangi parolingiz: ${password}`
			);
			if (resp === "error") continue;
			break;
		}
		return "ok";
	}
}

export default new smsService();
