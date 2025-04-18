// pages/genres.js
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

function GenreList(props) {
  const genres = props.genres
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Genres</h1>
      <ul style={{ fontSize: "20px" }}>
        {genres.map(g => (
          <li key={g.id}>
            <Link href={`/genres/${g.id}`}>{g.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const p = path.join(process.cwd(), 'data', 'data.json');
  const datajson = await fs.readFile(p);
  const data = JSON.parse(datajson);
  if (!data.genres) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      genres: data.genres
    }
  };
}

export default GenreList;
