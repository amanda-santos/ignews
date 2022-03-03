import Head from "next/head";
import { SubscribeButton } from "../components";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles["content-container"]}>
        <section className={styles["hero"]}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about
            <br /> the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />{" "}
            <span>for $9.90 month.</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </div>
  );
}