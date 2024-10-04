/** @format */

import mongoose from "mongoose";

const studentModel = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		min: 3,
	},
	lastName: {
		type: String,
		required: true,
		min: 3,
	},
	phoneNumber: {
		type: String,
		required: true,
		min: 12,
		max: 14,
		unique: true,
	},
	joined_tests: {
		type: [String],
		default: [],
	},
	telegramId: {
		type: String,
		default: null,
	},
});

export default mongoose.model("student", studentModel);
