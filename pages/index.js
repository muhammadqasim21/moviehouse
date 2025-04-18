// import Head from "next/head";
// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
// import styles from "@/styles/Home.module.css";
// import fs from 'fs/promises';
// import path from 'path';


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// function Home(props){

//   return(
//   <div className="container">
//       <h1 className="title">Trending Movies</h1>
//       <div className="movies-grid">
//         {props.movies.map(movie => (
//           <div key={movie.id} className="movie-card">
//             <h2 className="movie-title">{movie.title}</h2>
//             <p className="movie-info">{movie.description}</p>
//             <p className="movie-info">Year: {movie.releaseYear}</p>
//             <p className="movie-rating">Rating: ⭐ {movie.rating}</p>
//           </div>
//         ))}
//       </div>
//       <button className="browse-button">
//         Browse Genres
//       </button>
//     </div>
//   );

// }
// export async function getStaticProps() {
//   const p=path.join(process.cwd(),'data','data.json');
//   const datajson =await fs.readFile(p);
//   const data=JSON.parse(datajson);
//   if(!data.movies){
//     return{
//       notFound: true
//     }
//   }
//   const trendingmovies = data.movies.filter(e=>e.rating>7.5)
//   console.log(trendingmovies)
//   return{
//     props:{
//         movies:trendingmovies
//     },
//     //Incremental Static Regeneration
//     revalidate:10
//   }


// }
// export default Home;
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";
import fs from 'fs/promises';
import path from 'path';

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
          <div key={movie.id} className={styles.movieCard}>
            <h2>{movie.title}</h2>
            <p className={styles.description}>{movie.description}</p>
            <div className={styles.movieInfo}>
              <span>Year: {movie.releaseYear}</span>
              <span>Rating: {movie.rating}</span>
            </div>
          </div>
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