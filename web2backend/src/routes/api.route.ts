import express from 'express';
import userCtrl from '../api/user';
import orgCtrl from '../api/org';
import programCtrl from '../api/program';
import surveyCtrl from '../api/survey';
import questionCtrl from '../api/question';
import answerCtrl from '../api/answer';
import notFound from '../api/notfound';
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

router.route(['/program', '/program'])
	.get(programCtrl.getProgram)
	.post(programCtrl.postProgram)
	.put(programCtrl.putProgram)
	.delete(programCtrl.deleteProgram)

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

router.route('/answer')
	.get(answerCtrl.getAnswer)
	.post(answerCtrl.postAnswers)
	.put(answerCtrl.putAnswer)
	.delete(answerCtrl.deleteAnswer)

router.route('*')
	.get(notFound)
	.post(notFound)
	.put(notFound)
	.delete(notFound);

export default router;