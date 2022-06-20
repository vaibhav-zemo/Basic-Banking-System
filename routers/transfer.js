const express = require('express');
const router = express();
const transferController = require('../controllers/transfer_controller');

router.post('/:id', transferController.tranfer);
module.exports = router;