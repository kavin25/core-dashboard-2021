import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const links = [
    {
      fa: "home",
      url: "/",
    },
    {
      fa: "location-arrow",
      url: "/map",
    },
    {
      fa: "phone-alt",
      url: "/phone",
    },
    {
      fa: "pause",
      url: "/spotify",
    },
  ];
  return (
    <nav className={styles.navbar}>
      {links.map(({ fa, url }, idx) => (
        <Link href={url} key={idx}>
          <a>
            <i
              className={`fas fa-${fa} fa-3x`}
              style={{ color: router.pathname === url ? "var(--red)" : "" }}
            ></i>
          </a>
        </Link>
      ))}
    </nav>
  );
}
