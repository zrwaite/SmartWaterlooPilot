import express from 'express';
import userCtrl from '../api/user';
import orgCtrl from '../api/org';
import eventCtrl from '../api/event';
const router = express.Router();
router.route('/user')
	.get(userCtrl.getUser)
	.post(userCtrl.postUser)
	.put(userCtrl.putUser)
	.delete(userCtrl.deleteUser)

router.route('/org')
	.get(orgCtrl.getOrg)
	.post(orgCtrl.postOrg)
	.put(orgCtrl.putOrg)
	.delete(orgCtrl.deleteOrg)

router.route('/event')
	.get(eventCtrl.getEvent)
	.post(eventCtrl.postEvent)
	.put(eventCtrl.putEvent)
	.delete(eventCtrl.deleteEvent)
export default router;