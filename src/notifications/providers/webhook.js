const checker = require('./../../monitors/to-service/checker');

const sendWebhook = (url, data) => {
  console.log('notifying', url);
  return checker({
    method: 'POST',
    url,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

module.exports = url => (type, data) => sendWebhook(
  url,
  {
    ...data,
    type,
  },
);
