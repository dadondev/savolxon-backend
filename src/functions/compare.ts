/** @format */

import testModel from "../models/test.model";
import { resultsTestI, solvedI } from "../utils/types";

async function compareResult(data: resultsTestI) {
	const { results, phoneNumber, testId, telegramId } = data;
	const test = await testModel.findById(testId);
	if (!test) throw new Error("Test topilmadi!");
	let aboutResult: solvedI = {
		phoneNumber,
		testId,
		solved: [],
		wrongs: 0,
		corrects: 0,
		allQuizsCount: test.quizs.length,
		telegramId,
	};

	for (const result of results) {
		const quiz = test.quizs.find((e) => e._id.toString() === result.id);
		if (!quiz) continue;
		const answerIsCorrect = quiz.true_variant === result.answer;
		if (answerIsCorrect) {
			aboutResult = { ...aboutResult, corrects: aboutResult.corrects + 1 };
		} else {
			aboutResult = { ...aboutResult, wrongs: aboutResult.wrongs + 1 };
		}
		const singleSolved = {
			quizText: quiz.text,
			trueVariant: quiz.true_variant,
			selectedVariant: result.answer,
		};
		aboutResult = {
			...aboutResult,
			solved: [...aboutResult.solved, singleSolved],
		};
		continue;
	}

	return aboutResult;
}

export default compareResult;
