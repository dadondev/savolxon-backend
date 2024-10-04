/** @format */

import mongoose from "mongoose";

const solveSchema = new mongoose.Schema({
	quizText: {
		type: String,
		min: 3,
		required: true,
	},
	trueVariant: {
		type: String,
		min: 1,
		required: true,
	},
	selectedVariant: {
		type: String,
		min: 1,
		required: true,
	},
});

const resultSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	testId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	solved: {
		type: [solveSchema],
		default: [],
	},
	wrongs: {
		type: Number,
		default: 0,
	},
	corrects: {
		type: Number,
		default: 0,
	},
	allQuizsCount: {
		type: Number,
		default: 0,
	},
});

export default mongoose.model("solving", resultSchema);
