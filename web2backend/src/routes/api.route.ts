import express from 'express';
import userCtrl from '../api/user';
import orgCtrl from '../api/org';
import eventCtrl from '../api/event';
import surveyCtrl from '../api/survey';
import questionCtrl from '../api/question';
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

router.route('/survey')
	.get(surveyCtrl.getSurvey)
	.post(surveyCtrl.postSurvey)
	.put(surveyCtrl.putSurvey)
	.delete(surveyCtrl.deleteSurvey)

router.route('/question')
	.get(questionCtrl.getQuestion)
	.post(questionCtrl.postQuestion)
	.put(questionCtrl.putQuestion)
	.delete(questionCtrl.deleteQuestion)
export default router;