const express = require('express');
const router = express.Router();
const rootController = require('../controllers/root');

router.get('/', rootController.getHome);

// catch all 404 response
router.use(rootController.notFound);

module.exports = router;
