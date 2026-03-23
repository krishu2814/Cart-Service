const express = require('express');
const apiV1Routes = require('./v1');

const router = express.Router();

router.use('/v1', apiV1Routes);

module.exports = router;
