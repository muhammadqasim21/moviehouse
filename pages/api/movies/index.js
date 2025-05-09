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
    const movies = await db.collection('movies').find({}).toArray();

    // Map to exclude MongoDB's _id and return your own fields
    const moviesFormatted = movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      directorId: movie.directorId,
      genreId: movie.genreId
    }));
    res.status(200).json({ movies: moviesFormatted });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
