import Link from "next/link";

import { SignInButton } from "..";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-content"]}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};
