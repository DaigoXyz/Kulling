const express = require('express');
const router = express.Router();
const { getFoodTrucks } = require('../controllers/FTController');

router.get('/', getFoodTrucks);

module.exports = router;
