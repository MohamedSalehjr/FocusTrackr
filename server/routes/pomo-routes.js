const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('../models/http-error');
const pomoControllers = require('../controllers/pomo');
const {check} = require('express-validator')

const router = express.Router();

router.get('/:pid', pomoControllers.getPomoById)

//Example of using express validator 
// Although I won't use it further as I am not getting info from the client it will all be internal 
router.post('/', check('creator').not().isEmpty(), pomoControllers.postIntialPomo)

router.patch('/:pid', pomoControllers.patchPomoByDate)

module.exports = router;



