// allow dotenv to populate
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Model } = require('objection');
const passport = require('passport');

const knex = require('../src/database/bootstrap');

const githubStrategy = require('./passport/github');
const jwtStrategy = require('./passport/jwt');

const authTestRouter = require('./routes/authTest');
const checkRouter = require('./routes/checks');
const authRouter = require('./routes/auth');

const { PORT, CLIENT_ORIGIN } = require('./config/server');

const runner = require('./runner');

const app = express();

// set up Passport strategies
passport.use(githubStrategy);
passport.use(jwtStrategy);

// Log all requests. Skip logging during
app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
    skip: () => process.env.NODE_ENV === 'test',
  }),
);

// CORS ACCESS
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// required for passport to work
app.use(passport.initialize());

app.use('/api/auth', authRouter);

// Endpoints below this require a valid JWT
app.use(passport.authenticate('jwt', { session: false, failWithError: true }));

app.use('/api', authTestRouter);
app.use('/api', checkRouter);

// Catch-all 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use((err, req, res) => {
  console.log(err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

// Connect to DB and Listen for incoming connections
if (require.main === module) {
  // init knex and pass off to objection
  Model.knex(
    knex(),
  );

  app
    .listen(PORT, function () {
      console.info(`Server listening on ${this.address().port}`);
      // hack to bootstrap local queue worker
      runner();
    })
    .on('error', (err) => {
      console.error(err);
    });
}

// Export for testing
module.exports = app;
