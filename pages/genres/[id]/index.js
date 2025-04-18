// pages/genres/[id].js
import fs from 'fs/promises';
import path from 'path';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

function GenreMovies({ genre, movies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Genre: {genre.name}</h1>

      <div className={styles.movieGrid}>
        {movies.map(movie => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className={styles.movieCard}>
            <h2>{movie.title}</h2>
            <p className={styles.description}>{movie.description}</p>
            <div className={styles.movieInfo}>
              <span>Year: {movie.releaseYear}</span>
              <span>Rating: {movie.rating}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const genreId = context.params.id;
  const p = path.join(process.cwd(), 'data', 'data.json');
  const datajson = await fs.readFile(p);
  const data = JSON.parse(datajson);

  const genre = data.genres.find(g => g.id === genreId);
  if (!genre) {
    return {
      notFound: true
    };
  }

  const movies = data.movies.filter(m => m.genreId === genreId);

  return {
    props: {
      genre,
      movies
    }
  };
}

export default GenreMovies;
