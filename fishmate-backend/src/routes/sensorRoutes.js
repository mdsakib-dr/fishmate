const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, sensorController.createReading);
router.get('/pond/:pondId', authenticateJWT, sensorController.getReadingsForPond);

module.exports = router;
