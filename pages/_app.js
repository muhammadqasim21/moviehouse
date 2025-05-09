import '@/styles/globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import Header from '@/components/Header' // Import header

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header /> {/* This will appear on every page */}
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
