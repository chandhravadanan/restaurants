
var adminRoutes = require('./admin')
var authRoutes = require('./auth')
var userRoutes = require('./user')

var express = require('express');
var router = express.Router();

router.use(adminRoutes)
router.use(authRoutes)
router.use(userRoutes)

module.exports = router;