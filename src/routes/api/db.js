import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASSWORD}@cluster0.gbvra7s.mongodb.net/?retryWrites=true&w=majority`;
const DB = 'db';
const COL = 'subscriptions';

async function collection(col) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();
  return client.db(DB).collection(col);
}

export async function writeSubscription(subscription) {
  const C = await collection(COL);
  const count = await C.count({ sub: subscription });
  if (count > 0) return;
  const res = await C.insertOne({ sub: subscription });
  console.log('writeSubscription', res);
  return res;
}

export async function getSubscriptions() {
  const C = await collection(COL);
  const res = (await C.find().toArray()).map((x) => x?.sub);
  console.log('getSubscriptions', res);
  return res;
}

export async function resetDB() {
  const C = await collection(COL);
  const res = await C.remove();
  console.log('resetDB', res);
  return res;
}
