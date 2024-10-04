/** @format */

import mongoose from "mongoose";

const teacher = new mongoose.Schema({
	firstName: {
		type: String,
		min: 3,
		required: true,
	},
	lastName: {
		type: String,
		min: 3,
		required: true,
	},
	phoneNumber: {
		type: String,
		min: 13,
		max: 14,
		required: true,
		unique: true,
	},
	telegramId: {
		type: String,
		default: null,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
});

export default mongoose.model("teacher", teacher);
