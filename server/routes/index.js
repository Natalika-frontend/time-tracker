const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/', require('./auth'));
router.use('/', require('./user'));
router.use('/', require('./team'));
router.use('/', require('./project'));
router.use('/projects/:projectId', require('./tasks'));

module.exports = router;
