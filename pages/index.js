import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export default function Home({ movies }) {
  const router = useRouter();

  const handleBrowseGenres = () => {
    router.push('/genres');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      
      
        <div className={styles.movieGrid}>
          {movies.map(movie => (
            <Link href={`/movies/${movie.id}`}>
            <div key={movie.id} className={styles.movieCard}>
              <h2>{movie.title}</h2>
              <p className={styles.description}>{movie.description}</p>
              <div className={styles.movieInfo}>
                <span>Year: {movie.releaseYear}</span>
                <span>Rating: {movie.rating}</span>
              </div>
            </div>
            </Link>
          ))}
        </div>
      

      <div className={styles.buttonContainer}>
        <button 
          className={styles.genreButton}
          onClick={handleBrowseGenres}
        >
          Browse Genres
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const p=path.join(process.cwd(),'data','data.json');
  const datajson =await fs.readFile(p);
  const data=JSON.parse(datajson);
  if(!data.movies){
    return{
      notFound: true
    }
  }
  const trendingmovies = data.movies.filter(e=>e.rating>7.5)
  console.log(trendingmovies)
  return{
    props:{
        movies:trendingmovies
    },
    //Incremental Static Regeneration
    revalidate:10
  }


}