module.exports = (emitter) => {
  emitter.on('initialized', ({ monitor, event }) => {
    console.log('monitor initalized!', monitor, event);
  });

  emitter.on('healthy', ({ monitor, event }) => {
    console.log('monitor became healthy!', monitor, event);
  });

  emitter.on('unhealthy', ({ monitor, event }) => {
    console.log('monitor became unhealthy!', monitor, event);
  });
};
