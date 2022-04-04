import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { getOrg } from "../modules/getDatabaseInfo";
dotenv.config(); 

const getToken = (headers: any) => {
	if (headers.authorization) return headers.authorization.split(" ")[1];
	return false;
}

const verifyToken = (token: any) => {
	let decoded:any = {authorized: false};
	try {decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);	} 
	catch (e) {decoded = {authorized: false};}
	return decoded;
}

const verifyUser = (userId:string, token:string|undefined) => {
	if (!token) return {error: "no auth token provided", success: false}
	let decodedToken = verifyToken(token);
	if (!decodedToken.authorized) return {error: "invalid token", success: false}
	if (decodedToken.user_id !== userId) return {error: "username doesn't match token", success: false}
	return {error: "", success: true}
}
const verifyOrgMember = async (orgId:string, token:string|undefined):Promise<{success: boolean, error: string}> => {
	let {status, org, errors} = await getOrg(orgId);
	if (status === 200) {
		if (!token) return {error: "no auth token provided", success: false}
		let decodedToken = verifyToken(token);
		if (!decodedToken.authorized) return {error: "invalid token", success: false}
		if (decodedToken.user_id === org.owner) return {error: "", success: true}
		if (org.members.includes(parseInt(decodedToken.user_id))) return {error: "", success: true}
		return {error: "token not authorized for this org", success: false}
	} else return {success: false, error: errors[0]}
}


const createToken = (body: object) => {
	return jwt.sign(body, `${process.env.TOKEN_SECRET}`, { expiresIn: '3000000s' });
}
export {verifyOrgMember, createToken, verifyUser, getToken,};