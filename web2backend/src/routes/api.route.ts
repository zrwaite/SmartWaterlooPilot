import express from 'express';
import accountCtrl from '../api/account';
import eventCtrl from '../api/event';
const router = express.Router();
router.route('/account')
	.get(accountCtrl.getAccount)
	.post(accountCtrl.postAccount)
	.put(accountCtrl.putAccount)
	.delete(accountCtrl.deleteAccount)

router.route('/event')
	.get(eventCtrl.getEvent)
	.post(eventCtrl.postEvent)
	.put(eventCtrl.putEvent)
	.delete(eventCtrl.deleteEvent)
export default router;