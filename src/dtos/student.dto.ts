/** @format */

class studentDto {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	constructor(data: any) {
		this.id = data._id;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.phoneNumber = data.phoneNumber;
	}
}
export default studentDto;
