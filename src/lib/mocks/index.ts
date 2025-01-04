export const initMSW = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    console.log('browser worker', worker);
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};
