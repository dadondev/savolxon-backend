/** @format */

class jwtDto {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	telegramId: string;
	constructor(data: any) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.phoneNumber = data.phoneNumber;
		this.telegramId = data.telegramId;
	}
}

export default jwtDto;
