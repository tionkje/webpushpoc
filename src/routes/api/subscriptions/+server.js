import { getSubscriptions } from '../db.js';

export async function GET() {
  return new Response(await getSubscriptions());
}
