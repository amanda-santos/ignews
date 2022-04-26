import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { client } from "../../../services/prismic";

import { Post as PostType } from "../../../types";
import styles from "../post.module.scss";

type PostPreviewProps = {
  post: PostType;
};

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [post.slug, router, session]);

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
            className={`${styles["post-content"]} ${styles["preview-content"]}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles["continue-reading"]}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe now</a>
            </Link>{" "}
            🤗
          </div>
        </article>
      </main>
    </>
  );
}

// =================================GET STATIC PATHS============================================
// we have three different approaches for getStaticProps:
// #1: Generate static pages during build
// #2 Generate static page on first access
// #3 Do #1 with some pages and #2 with others
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // PATHS: here we add all the pages paths we want to be preloaded for the user;
    // e.g: most accessed pages, trending pages
    // paths: [{ params: { slug: "jamstack-geleia-de-javascript-api-e-markup" } }],
    paths: [],

    // FALLBACK: if page isn't already statically loaded, do this...
    // true = page makes request to server on client-side, after user opens it; causes layout shift; it's not good for SEO.
    // false = don't do anything, don't send request to server, just show a 404 error.
    // blocking = page makes request to server inside getStaticProps, and only after it renders page for user; doesn't cause layout shift; good for SEO.
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const response = await client?.getByUID<any>("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response?.data.title),
    content: RichText.asHtml(response?.data.content.splice(0, 3)),
    updatedAt: new Date(response?.last_publication_date).toLocaleDateString(
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
    revalidate: 60 * 30, // 30 minutes
  };
};
