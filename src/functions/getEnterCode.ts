/** @format */

import testModel from "../models/test.model";

async function getRandomEnterCode() {
	let unique = false;
	let enterCode = getCode();
	while (!unique) {
		const test = await testModel.findOne({ enterCode });
		if (!test) break;
		enterCode = getCode();
	}
	return enterCode + "";
}

export function getCode() {
	return Math.ceil(Math.random() * (999999 - 100000 + 1)) + 100000;
}

export default getRandomEnterCode;
