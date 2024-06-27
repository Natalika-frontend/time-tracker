const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/', require('./auth'));
router.use('/', require('./team'));

module.exports = router;
