import axios from 'axios';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

function GenreMovies({ genre, movies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Genre: {genre.name}</h1>

      <div className={styles.movieGrid}>
        {movies.map((movie) => (
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

  try {
    // Call your API endpoint to get movies by genre
    const response = await axios.get(`http://localhost:3000/api/genres/${genreId}/movies`);
    const { genre, movies } = response.data;

    if (!genre) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        genre,
        movies,
      },
    };
  } catch (error) {
    console.error('Failed to fetch genre movies:', error);

    return {
      notFound: true,
    };
  }
}

export default GenreMovies;
