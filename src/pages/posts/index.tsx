import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RichText } from "prismic-dom";

import { client } from "../../services/prismic";
import { Post as PostType } from "../../types";
import styles from "./styles.module.scss";

type Post = Omit<PostType, "content"> & { excerpt: string };

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  const { data: session } = useSession();
  const [shouldShowFullPost, setShouldShowFullPost] = useState(false);

  useEffect(() => {
    if (session?.activeSubscription) {
      setShouldShowFullPost(true);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              href={
                shouldShowFullPost
                  ? `/posts/${post.slug}`
                  : `/posts/preview/${post.slug}`
              }
              key={post.slug}
            >
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const results = await client.getAllByType("post");

  const posts = results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "en-US",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
