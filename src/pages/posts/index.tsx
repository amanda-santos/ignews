import Head from "next/head";

import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>babababa</time>
            <strong>ahahahhahahah</strong>
            <p>uuuuuuuuuuu</p>
          </a>

          <a href="">
            <time>babababa</time>
            <strong>ahahahhahahah</strong>
            <p>uuuuuuuuuuu</p>
          </a>

          <a href="">
            <time>babababa</time>
            <strong>ahahahhahahah</strong>
            <p>uuuuuuuuuuu</p>
          </a>
        </div>
      </main>
    </>
  );
}
