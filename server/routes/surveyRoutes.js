// routes/surveyRoutes.js
const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

router.post('/save', surveyController.saveSurvey);

module.exports = router;
