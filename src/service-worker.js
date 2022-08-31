// import { build, files, prerendered, version } from '$service-worker';

// console.log(build);

self.addEventListener('push', (event) => {
  event.waitUntil(self.registration.showNotification('Test message', { body: 'messagebody' }));
});
