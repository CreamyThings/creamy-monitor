'use strict';

const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../../src/database/models/User');

const localStrategy = new LocalStrategy((username, password, done) => {
  return User.getByUsername(username)
    .then(user => {
      if (user) {
        return user.validate(password)
      }
    })
    .then(isValid => {
      if (!isValid) {
        return done(new Error('wrong password.'));
      }

      return done(null, user);
    })
    .catch(err => {
      return done(err);
    });
  // User.findOne({ username })
  //   .then(results => {
  //     user = results;
  //     if (!user) {
  //       return Promise.reject({
  //         reason: 'LoginError',
  //         message: 'Incorrect username',
  //         location: 'username'
  //       });
  //     }
  //     return user.validatePassword(password);
  //   })
  //   .then(isValid => {
  //     if (!isValid) {
  //       return Promise.reject({
  //         reason: 'LoginError',
  //         message: 'Incorrect password',
  //         location: 'password'
  //       });
  //     }
  //     return done(null, user);
  //   })
  //   .catch(err => {
  //     if (err.reason === 'LoginError') {
  //       return done(null, false);
  //     }
  //     return done(err);
  //   });
});

module.exports = localStrategy;
