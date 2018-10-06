'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  API_ORIGIN: process.env.API_ORIGIN || 'http://localhost:8080',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
