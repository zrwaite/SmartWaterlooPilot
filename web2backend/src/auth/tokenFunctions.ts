import dotenv from "dotenv";
import jwt from "jsonwebtoken";
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

const createToken = (body: object) => {
	return jwt.sign(body, `${process.env.TOKEN_SECRET}`, { expiresIn: '3000000s' });
}
export {createToken, verifyUser, getToken,};