import webPush from 'web-push';
import { env as envPriv } from '$env/dynamic/private';
import { env } from '$env/dynamic/public';

if (!env.PUBLIC_VAPID || !envPriv.PRIVATE_VAPID) {
  const vapidKeys = webPush.generateVAPIDKeys();
  throw new Error(
    `Missing vapid keys, add to PUBLIC_VAPID and PRIVATE_VAPID: ${JSON.stringify(vapidKeys, 0, 2)}`
  );
}

webPush.setVapidDetails('mailto:spam@bastiaandeknudt.be', env.PUBLIC_VAPID, envPriv.PRIVATE_VAPID);

export async function POST({ request }) {
  const subscription = await request.json();
  console.log('sendNotification', subscription);
  return new Response(await webPush.sendNotification(subscription));
}
