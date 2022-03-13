import express from 'express';
import userCtrl from '../api/account';
const router = express.Router();
router.route('/user')
	.get(userCtrl.getAccount)
	.post(userCtrl.postAccount)
	.put(userCtrl.putAccount)
	.delete(userCtrl.deleteAccount)
export default router;