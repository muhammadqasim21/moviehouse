import styles from "@/styles/Home.module.css";
import axios from 'axios';  // Import axios
import Link from "next/link";
import { useRouter } from "next/router";

function Movies({ movies, genres }) {
  const router = useRouter();

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre === 'all') {
      router.push('/movies');
    } else {
      router.push(`/genres/${selectedGenre}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ALL Movies</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="genre">Filter by Genre: </label>
        <select id="genre" onChange={handleGenreChange}>
          <option value="all">All</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

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

export async function getStaticProps() {
  try {
    // Directly specify the API URL in the Axios request
    const moviesResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
    const genresResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
    console.log(moviesResponse.data.movies)
    // Return the fetched data as props
    return {
      props: {
        movies: moviesResponse.data.movies,
        genres: genresResponse.data.genres,
      },
      revalidate: 10, // Incremental Static Regeneration
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return { notFound: true };
  }
}

export default Movies;
