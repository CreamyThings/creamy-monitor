const checker = require('./../../monitors/to-service/checker');

module.exports = url => (type, { monitor, event }) => {
  const title = `${monitor.name} is ${type}!`;

  const attachments = event.actions.map(action => ({
    color: action.passed ? 'good' : 'danger',
    fallback: action.text,
    text: action.text,
  }));

  return checker({
    url,
    method: 'POST',
    body: JSON.stringify({
      text: title,
      attachments,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
