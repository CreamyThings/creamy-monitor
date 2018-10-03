'use strict';

const express = require('express');
const router = express.Router();

// Protected GET
router.get('/protected', (req, res, next) => {
  res.json({ message: 'Protected Endpoint' });
});

module.exports = router;
