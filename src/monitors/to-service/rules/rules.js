// response time is in ms, convert to s
const responseTime = data => data.responseTime / 1000;

const responseCode = data => data.statusCode;

const responseBody = data => data.body;

module.exports = {
  responseTime,
  responseCode,
  responseBody,
};
