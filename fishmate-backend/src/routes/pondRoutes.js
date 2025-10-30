const express = require('express');
const router = express.Router();
const pondController = require('../controllers/pondController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, pondController.createPond);
router.get('/', authenticateJWT, pondController.listPonds);

module.exports = router;
