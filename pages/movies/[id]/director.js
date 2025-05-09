import axios from 'axios';
import styles from "@/styles/Home.module.css";

export default function DirectorDetail({ director }) {
  if (!director) return <p>Loading director info...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Director Information</h1>
      <div className={styles.movieCard}>
        <h2>{director.name}</h2>
        <p className={styles.description}>{director.biography}</p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
    const movies = response.data;

    const paths = movies.map(movie => ({
      params: { id: movie.id },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`);
    const movie = response.data.movie;
    const director = response.data.director
    // const { movie, director } = response.data;

    if (!movie || !director) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        director,
      },
    };
  } catch (error) {
    console.error('Error fetching movie or director data:', error);
    return {
      notFound: true,
    };
  }
}
