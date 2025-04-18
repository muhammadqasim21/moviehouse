import styles from "@/styles/Home.module.css";
import fs from 'fs/promises';
import Link from "next/link";
import { useRouter } from "next/router";
import path from 'path';
function Movies(props){
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
                {props.genres.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                ))}
                </select>
            </div>
          <div className={styles.movieGrid}>
            {props.movies.map(movie => (
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
    const p=path.join(process.cwd(),'data','data.json');
      const datajson =await fs.readFile(p);
      const data=JSON.parse(datajson);
      if(!data.movies){
        return{
          notFound: true
        }
      }
      return{
        props:{
            movies:data.movies,
            genres: data.genres
        },
        //Incremental Static Regeneration
        revalidate:10
      }
    
}
export default Movies
