import { useRouter } from 'next/router';
import styles from '@/styles/404.module.css';

export default function HelpPage() {
  const router = useRouter();
  const { slug = [] } = router.query;

  const helpContent = {
    "": { title: "Help Center", content: "Welcome to the Help Center." },
    "faqs": { title: "FAQs", content: "Frequently asked questions." },
    "contact": { title: "Contact Us", content: "Here's how to reach us." },
    "privacy": { title: "Privacy Policy", content: "Our privacy practices." }
  };

  const key = slug.join('/');
  const page = helpContent[key];

  const handleNav = () => {
    router.push('/');
  };

  if (!page) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.message}>Sorry, the page you're looking for doesn't exist.</p>
        <button className={styles.goHomeButton} onClick={handleNav}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
}
