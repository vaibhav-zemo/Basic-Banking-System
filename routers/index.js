const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);
router.get('/contact',homeController.contact);
router.use('/customer',require('./customer'));
router.use('/transfer',require('./transfer'));

module.exports = router;