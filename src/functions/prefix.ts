/** @format */

import testModel from "../models/test.model";
import dateFNS from "date-fns";

async function prefix() {
	const tests = await testModel.find();
	for (const test of tests) {
		const today = new Date();
		if (!test.start_date || !test.finish_date) continue;
		const isBefore = dateFNS.isBefore(test.start_date, today);
		const isAfter = dateFNS.isAfter(test.finish_date, today);
		if (test.status === "finished") continue;
		if (test.status === "active" && !isAfter) {
			test.status = "finished";
			test.members = test.members.map((e) => (e.status = "finished")) as any;
			await test.save();
			continue;
		}
		if (test.status === "willbe" && isBefore) {
			test.status = "active";
			await test.save();
			continue;
		}
	}
	return "ok";
}
export default prefix;
