const { Strategy } = require('passport-github');
const { client, secret, callbackURL } = require('../../src/config/auth');
const User = require('../../src/database/models/user');

module.exports = new Strategy({
  clientID: client,
  clientSecret: secret,
  callbackURL,
}, (accessToken, refreshToken, profile, cb) => {
  return User.findByGithub(profile.id)
    .then(user => {
      if (!user) {
        return User
          .query()
          .insertGraphAndFetch({
            name: profile.displayName,
            username: profile.username,
            email: profile.emails[0].value,
            githubId: profile.id,
          })
      }

      return user;
    })
    .then(user => cb(null, user))
    .catch(err => cb(err));
});
