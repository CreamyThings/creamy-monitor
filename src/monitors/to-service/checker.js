const request = require('request');

module.exports = ({
  url,
  method = 'GET',
  body,
  headers = {},
  cookies = {},
  timeoutSeconds = 4
}) => {
  const jar = request.jar();

  Object.entries(cookies).forEach(pair => {
    jar.setCookie(pair.join('='), url);
  });

  // `request` takes timeout in ms,
  // so convert our s timeout to ms
  const timeout = timeoutSeconds * 1000;

  return new Promise(resolve => {
    request(
      {
        method,
        url,
        body,
        headers,
        jar,
        timeout: timeoutSeconds * 1000,
        time: true // benchmark the request
      },
      (error, response, responseBody) => {
        resolve({
          error: error,
          statusCode: response && response.statusCode,
          responseTime: response && response.timings && response.timings.end,
          body: responseBody
        });
      }
    );
  });
};
