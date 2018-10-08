const request = require('request');

const sendWebhook = (url, data) => new Promise((resolve) => {
  console.log('notifying', url);
  request({
    method: 'POST',
    url,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }, resolve);
});

module.exports = url => (type, data) => sendWebhook(
  url,
  {
    ...data,
    type,
  },
);
