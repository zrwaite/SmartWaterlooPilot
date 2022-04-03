import express from 'express';
import signIn from "../auth/signin";
const router = express.Router();
router.route('/signin')
	.post(signIn)

export default router;