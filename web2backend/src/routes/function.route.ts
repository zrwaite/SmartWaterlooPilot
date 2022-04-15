import express from 'express';
import {verifyOrg} from "../api/function";
const router = express.Router();
router.route('/verify')
	.post(verifyOrg)

export default router;