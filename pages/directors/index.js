// pages/directors/index.js
import useSWR from 'swr';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);
  
  if (error) return <p>Failed to load directors</p>;
  if (!data) return <p>Loading...</p>;
  const { directors} = data;
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Directors</h1>
      <div className={styles.movieGrid}>
        {directors.map((d) => {
          return (
            <div key={d.id} className={styles.movieCard}>
              <Link href={`/directors/${d.id}`}><h2>{d.name}</h2></Link>
              <p className={styles.directors}>{d.biography}</p>
              <br></br>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
