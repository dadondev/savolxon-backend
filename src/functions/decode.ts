/** @format */

import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/utils";
import jwtDto from "../dtos/jwt.dto";
function decode(token: string) {
	try {
		const user = jwt.verify(token, jwtSecret);
		return user as jwtDto;
	} catch (error) {
		throw error;
	}
}

export default decode;
