// components/Header.js
import styles from './Header.module.css';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Movie App</h1>
      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}
