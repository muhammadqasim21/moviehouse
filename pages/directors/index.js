// pages/directors/index.js
import useSWR from 'swr';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <p>Failed to load directors</p>;
  if (!data) return <p>Loading...</p>;
  const { directors, movies } = data;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Directors</h1>
      <div className={styles.movieGrid}>
        {directors.map((d) => {
          const directedMovies = movies.filter((movie) => movie.directorId === d.id);
          return (
            <div key={d.id} className={styles.movieCard}>
              <h2>{d.name}</h2>
              <p style={{ color: 'black' }}>{d.biography}</p>
              <br></br>
              <h3 style={{ color: 'black' }}>Movies:</h3>
              <ul style={{ color: 'black' }}>
                {directedMovies.map((movie) => (
                  <Link href={ `/movies/${movie.id}`}>
                  <li key={movie.id}>{movie.title}</li>
                  </Link>
                ))}

              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
