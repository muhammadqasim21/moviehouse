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
  const { id } = req.query;

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);

    // 1) Find the director by id
    const director = await db.collection('directors').findOne({ id });
    if (!director) {
      return res.status(404).json({ error: 'Director not found' });
    }

    // 2) Find all movies directed by this director
    const movies = await db.collection('movies').find({ directorId: id }).toArray();

    // 3) Return both director and their movies
    return res.status(200).json({ director, movies });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
