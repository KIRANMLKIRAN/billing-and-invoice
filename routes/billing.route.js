const express = require('express');
const router = express.Router();
const billing_controller = require('../controller/billing.controller');

router.post('/insert', billing_controller.create);
router.get('/displayall', billing_controller.display);
router.get('/displaysingle/:id', billing_controller.displaysingle);
router.put('/edit/:id', billing_controller.edit);
router.delete('/delete/:id', billing_controller.delete);
router.get('/invoice/:id', billing_controller.invoice);


module.exports = router;