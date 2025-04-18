import { useRouter } from 'next/router';

export default function HelpPage() {
  const router = useRouter();
  const { slug = [] } = router.query;

  const key = slug.join('/');
  
  const helpContent = {
    "": {
      title: "Help Center",
      content: "Welcome to the Help Center."
    },
    "faqs": {
      title: "FAQs",
      content: "Frequently asked questions."
    },
    "contact": {
      title: "Contact Us",
      content: "Here's how to reach us."
    },
    "privacy": {
      title: "Privacy Policy",
      content: "Our privacy practices."
    }
  };

  const page = helpContent[key] || {
    title: "Page Not Found",
    content: "Sorry, that help topic doesn't exist."
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
}
