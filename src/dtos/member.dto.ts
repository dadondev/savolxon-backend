/** @format */

class memberDto {
	id: string;
	phoneNumber: string;
	studentId: string;
	resultId: string;
	constructor(data: any) {
		this.id = data._id;
		this.phoneNumber = data.phoneNumber;
		this.studentId = data.studentId;
		this.resultId = data.resultId;
	}
}
class pushMemberDto {
	phoneNumber: string;
	studentId: string;
	resultId: string;
	constructor(data: any) {
		this.phoneNumber = data.phoneNumber;
		this.studentId = data.studentId;
		this.resultId = data.resultId;
	}
}

export { pushMemberDto };

export default memberDto;
