import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorDetail() {
    const router = useRouter();
    const { id } = router.query;
  
    const { data, error } = useSWR(id ? `/api/directors/${id}` : null, fetcher);
  
    if (error) return <p>Failed to load director</p>;
    if (!data || !data.director || !data.movies) return <p>Loading...</p>;
    const director = data.director;
    const movies = data.movies;
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{director.name}</h1>
        <p>{director.biography}</p>
  
        <h2 style={{ marginTop: '2rem' }}>Movies Directed</h2>
        <ul className={styles.container}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  