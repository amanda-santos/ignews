import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../services/prismic";
import { Post as PostType } from "../../types";
import styles from "./post.module.scss";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles["container"]}>
        <article className={styles["post"]}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles["post-content"]}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

// this is a restricted page
// getServerSideProps is safe unlike getStaticProps
export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session) {
    console.log("Not logged");
  }

  const prismic = getPrismicClient(req);
  const response = await prismic.getByUID<any>("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: { post },
  };
};
