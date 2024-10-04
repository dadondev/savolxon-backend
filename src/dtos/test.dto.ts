/** @format */

class TestDto {
	id: string;
	name: string;
	teacher_id: string;
	quizs: [];
	constructor(data: any) {
		this.id = data._id;
		this.name = data.name;
		this.teacher_id = data.teacher;
		this.quizs = data.quizs.map((e: any) => new SingleQuiz(e));
	}
}

export class SingleQuiz {
	id: string;
	text: string;
	variants: [];
	true_variant: string;
	constructor(data: any) {
		this.id = data._id;
		this.text = data.text;
		this.variants = data.variants.map((e: any) => new SingleVariant(e));
		this.true_variant = data.true_variant;
	}
}
class SingleVariant {
	id: string;
	text: string;
	name: string;
	constructor(data: any) {
		this.id = data._id;
		this.text = data.text;
		this.name = data.name;
	}
}

export default TestDto;

class listTest {
	id: string;
	name: string;
	teacher: object;
	quizsCount: number;
	finish_date: Date | null;
	start_date: Date | null;
	enterCode: string;
	status: string;
	constructor(data: any, teacher: any) {
		(this.id = data._id), (this.name = data.name);
		(this.teacher = new shortTeacher(teacher)),
			(this.quizsCount = data.quizs.length);
		this.finish_date = data.finish_date;
		this.start_date = data.start_date;
		this.status = data.status;
		this.enterCode = data.enterCode;
	}
}

class shortTeacher {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	constructor(data: any) {
		this.id = data.id;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.phoneNumber = data.phoneNumber;
	}
}

export { listTest };
