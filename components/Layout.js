import Head from "next/head";

import Navbar from "./Navbar";
import styles from "./Layout.module.css";
import Widget from "./Widget";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Navbar />
      <Widget
        style={{
          height: "calc(100vh - 80px)",
          width: "100%",
          marginRight: "80px",
        }}
        bgColor="--dark"
        textColor="white"
      >
        {children}
      </Widget>
    </div>
  );
}
