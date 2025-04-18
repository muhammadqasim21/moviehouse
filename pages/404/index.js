// pages/404.js
import Link from 'next/link';
import styles from '@/styles/404.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Oops! Page Not Found</h1>
      <p className={styles.message}>Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" className={styles.goHomeButton}>Go Home</Link>
    </div>
  );
}
