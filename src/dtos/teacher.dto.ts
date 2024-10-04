/** @format */

class teacherDto {
	id: string;
	firstName: string;
	lastName: string;
	telegramId: string;
	phoneNumber: string;
	token: string;
	constructor(teacher: any) {
		this.id = teacher._id;
		this.firstName = teacher.firstName;
		this.lastName = teacher.lastName;
		this.telegramId = teacher.telegramId;
		this.phoneNumber = teacher.phoneNumber;
		this.token = teacher.token;
	}
}

export default teacherDto;
