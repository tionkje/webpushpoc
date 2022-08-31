import { resetDB } from '../db.js';
export async function GET() {
  return new Response(await resetDB());
}
