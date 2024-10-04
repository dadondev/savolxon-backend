/** @format */

import * as mongoose from "mongoose";

const statusT = ["willbe", "finished", "active"];
const statusMbrT = ["started", "finished"];

const member = new mongoose.Schema({
	phoneNumber: {
		type: String,
		required: true,
		min: 12,
		max: 14,
	},
	studentId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	resultId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	status: {
		enum: statusMbrT,
		default: "started",
		type: String,
	},
});

const singleVariant = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

const singleQuiz = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		min: 3,
		unique: true,
	},
	variants: {
		type: [singleVariant],
		default: [],
	},
	true_variant: {
		type: String,
		required: true,
	},
});

const testModel = new mongoose.Schema({
	name: { type: String, required: true },
	teacher_id: { type: String, required: true },
	quizs: {
		default: [],
		type: [singleQuiz],
	},
	start_date: {
		type: Date,
		default: null,
	},
	finish_date: {
		type: Date,
		default: null,
	},
	status: {
		enum: statusT,
		type: String,
		default: "willbe",
	},
	members: {
		type: [member],
		default: [],
	},
	enterCode: {
		type: String,
		required: true,
		max: 7,
		unique: true,
		min: 5,
	},
});

export default mongoose.model("testModel", testModel);
