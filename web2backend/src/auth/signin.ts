import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {createToken} from "./tokenFunctions";
import {getUserHash} from "../modules/getDatabaseInfo";
import bcrypt from "bcrypt";
import {getBodyParams} from "../modules/getParams";

const signInController = async (req: Request, res: Response) => {
	let result:responseInterface = new response();
	let {success, params, errors} = await getBodyParams(req, ["user_id", "password"]);
	if (success) {
		const userId = params[0];
		const password = params[1];
		let token = createToken({user_id: userId, authorized: true})
		const getUserResult = await getUserHash(userId);
		result.status = getUserResult.status;
		const user = getUserResult.user;
		if (result.status==200) {
			let passwordCheck = bcrypt.compareSync(password, user.password_hash);
			if (passwordCheck) {
				result.response = {token: token};
				result.success = true;
			} else {
				result.errors.push("invalid password");
				result.status = 400;
				result.success = false;
			}
		} else if (result.status==404) result.errors.push("user not found");
	} else errors.forEach((error) => result.errors.push(`missing ${error}`));
	res.status(result.status).json(result);
};

export default signInController;