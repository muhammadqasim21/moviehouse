import styles from "@/styles/Home.module.css";
import Link from "next/link";

function Help() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Help Center</h1>
      <p style={{ textAlign: "center" }}>Welcome to Help Center</p>
      
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link href="/help/faqs">
          FAQs
        </Link>
        <br></br>
        <Link href="/help/contact">
          CONTACT
        </Link>
        <br></br>
        <Link href="/help/privacy">
          PRIVACY
        </Link>
      </div>
    </div>
  );
}

export default Help;
