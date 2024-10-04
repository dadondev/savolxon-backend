/** @format */

export interface editQuizI {
	text?: string;
	variants?: [];
	true_variant?: string;
}
export interface solvedI {
	phoneNumber: string;
	testId: string;
	solved: singleSolve[] | [];
	wrongs: number;
	corrects: number;
	allQuizsCount: number;
	telegramId: string | undefined;
}

export interface singleSolve {
	quizText: string;
	trueVariant: string;
	selectedVariant: string;
}

export interface enterTestI {
	phoneNumber: string;
	testCode: string;
}

export interface resultsTestI {
	results: resultQuizI[] | [];
	testId: string;
	phoneNumber: string;
	telegramId: string | undefined;
}
export interface resultQuizI {
	id: string;
	answer: string;
}

export interface updateResultAns {
	quizText?: string;
	trueVariant?: string;
	selectedVariant?: string;
}
