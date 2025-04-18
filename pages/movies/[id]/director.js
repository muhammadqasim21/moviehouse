import fs from 'fs/promises';
import path from 'path';
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
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const paths = data.movies.map(movie => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const movie = data.movies.find(m => m.id === id);
  if (!movie) {
    return {
      notFound: true,
    };
  }

  const director = data.directors.find(d => d.id === movie.directorId);

  if (!director) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      director,
    },
  };
}
