const express = require('express');
const router = express.Router();
const { saveSurvey,surveyController } = require('../controllers/surveyController');

router.post('/save', saveSurvey);
router.get('/latest/:userId', surveyController.getLatestSurveyId);

module.exports = router;
