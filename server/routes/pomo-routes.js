const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('../models/http-error');
const pomoControllers = require('../controllers/pomo');

const router = express.Router();

router.get('/:pid', pomoControllers.getPomoById)

router.post('/:pid', pomoControllers.postIntialPomo)

router.patch('/:pid', pomoControllers.patchPomoByDate)

module.exports = router;



