/** @format */

import mongoose from "mongoose";

const tmeUser = new mongoose.Schema({
	firstName: String,
	lastName: String,
	phoneNumber: String,
	password: String,
	action: String,
	telegramId: {
		type: String,
		unique: true,
	},
	role: String,
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model("tmeUser", tmeUser);
