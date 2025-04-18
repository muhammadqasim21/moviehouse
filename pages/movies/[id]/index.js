import fs from 'fs/promises';
import styles from "@/styles/Home.module.css";
import path from 'path';
import Link from 'next/link';

function MovieDetail(props) {
  const { movie, director } = props;

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
              <Link href = {`/movies/${movie.id}/director`}>
              <h3>Director: {director.name}</h3>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const dataJson = await fs.readFile(filePath);
  const data = JSON.parse(dataJson);

  const movie = data.movies.find(o => o.id === context.params.id);

  if (!movie) {
    return {
      redirect: {
        destination: '/no-data'
      }
    };
  }

  const director = data.directors.find(d => d.id === movie.directorId) || null;

  return {
    props: {
      movie,
      director
    }
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const dataJson = await fs.readFile(filePath);
  const data = JSON.parse(dataJson);

  if (!data.movies) {
    return {
      notFound: true
    };
  }

  const paths = data.movies.map(o => ({ params: { id: o.id } }));

  return {
    paths,
    fallback: true
  };
}

export default MovieDetail;
