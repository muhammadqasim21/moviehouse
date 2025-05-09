// pages/genres.js
import axios from 'axios';
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
  try{
    const genresResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
    const genrelist = genresResponse.data.genres
    if(!genrelist){
      return {
        notFound: true
      };
    }
    return {
      props: {
        genres: genrelist
      }
    };
  }
  catch(error){
    console.error("Error fetching data", error);
    return { notFound: true };
  }
}

export default GenreList;
