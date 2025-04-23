// pages/404.js
import Link from 'next/link';
import styles from '@/styles/404.module.css';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter()
  const handlenav = () =>{
    router.push('/')
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Oops! Page Not Found</h1>
      <p className={styles.message}>Sorry, the page you're looking for doesn't exist.</p>
      <button className={styles.goHomeButton} onClick={handlenav}>
        Go Home
      </button>
      
    </div>
  );
}
