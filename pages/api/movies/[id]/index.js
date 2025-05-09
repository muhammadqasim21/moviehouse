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
    const movie = await db.collection('movies').findOne({ id });
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    const director = await db.collection('directors').findOne({ id: movie.directorId });

      // Return the movie and director data
    return res.status(200).json({ movie, director });
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
