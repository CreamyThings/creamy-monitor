'use strict';

const express = require('express');
const router = express.Router();

// Get request test
router.get('/test', (req, res, next) => {
  res.json({ message: 'Working!' });
});

module.exports = router;
