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
  const { id:genreId } = req.query;
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const genre = await db.collection('genres').findOne({ id:genreId });
    if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
    }
    const movies = await db
      .collection('movies')
      .find({ genreId: genreId })
      .project({
        _id: 0, // exclude _id
        id: 1,
        title: 1,
        description: 1,
        releaseYear: 1,
        rating: 1,
      })
      .toArray();
      return res.status(200).json({ genre, movies });
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
