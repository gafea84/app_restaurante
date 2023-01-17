const router = require('express').Router();

router.use('/comensales', require('./api/comensales'));
router.use('/mesas', require('./api/mesas'));

module.exports = router;