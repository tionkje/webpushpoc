import { getSubscriptions } from './api/db.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
  return { subs: await getSubscriptions() };
}
