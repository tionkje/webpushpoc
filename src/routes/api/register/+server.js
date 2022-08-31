import { writeSubscription } from '../db.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  return new Response(await writeSubscription(await request.text()));
}
