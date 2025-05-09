import axios from 'axios';
import styles from "@/styles/Home.module.css";
import Link from 'next/link';

function MovieDetail({ movie, director }) {
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Detail</h1>

      <div className={styles.movieGrid}>
        <div key={movie.id} className={styles.movieCard}>
          <h2>{movie.title}</h2>
          <p className={styles.description}>{movie.description}</p>
          <div className={styles.movieInfo}>
            <span>Year: {movie.releaseYear}</span>
            <span>Rating: {movie.rating}</span>
          </div>

          {director && (
            <div style={{ marginTop: '1rem', color: 'black' }}>
              <Link href={`/movies/${movie.id}/director`}>
                <h3>Director: {director.name}</h3>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let movie = null;
  let director = null;

  try {
    // Fetch movie details from the API
    const movieResponse = await axios.get(`http://localhost:3000/api/movies/${params.id}`);
    movie = movieResponse.data.movie;
    director = movieResponse.data.director;
    

    if (!movie) {
      return {
        redirect: {
          destination: '/no-data',
        },
      };
    }

  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
      director,
    },
  };
}

export async function getStaticPaths() {
  let paths = [];

  try {
    
    const moviesResponse = await axios.get('http://localhost:3000/api/movies');
    const movies = moviesResponse.data.movies;

    paths = movies.map((movie) => ({ params: { id: movie.id } }));

  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }

  return {
    paths,
    fallback: false, 
  };
}

export default MovieDetail;
