import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const genres = await db.collection('genres').find({}).toArray();

    // Map to exclude MongoDB's _id and return your own fields
    const genresFormatted = genres.map(genre => ({
      id: genre.id,
      name: genre.name
    }));
    
    res.status(200).json({ genres: genresFormatted });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
