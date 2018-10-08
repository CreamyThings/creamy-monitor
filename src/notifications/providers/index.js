const webhook = require('./webhook');
const slack = require('./slack');

const providers = {
  webhooks: webhook,
  slack,
};

module.exports.mapNotification = ({ type, value }) => providers[type](value);

module.exports.mapNotifications = (notifications) => {
  const mappedNotifications = [];

  Object.entries(notifications).forEach(([type, values]) => {
    values.forEach((value) => {
      const mappedNotification = module.exports.mapNotification({ type, value });
      mappedNotifications.push(mappedNotification);
    });
  });

  return mappedNotifications;
};
