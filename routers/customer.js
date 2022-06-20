const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer_controller');

router.get('/', customerController.customer);
router.get('/create-customer', customerController.createCustomer);
router.post('/create-session',customerController.createSession);
router.get('/transfer/:id',customerController.transfer);
router.get('/transfer-record', customerController.transfer_record);


module.exports = router;