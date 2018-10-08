module.exports = (emitter) => {
  emitter.on('create', (monitor) => {
    console.log('created', monitor);
  });

  emitter.on('update', (monitor) => {
    console.log('updated', monitor);
  });

  emitter.on('delete', (monitor) => {
    console.log('deleted', monitor);
  });
};
