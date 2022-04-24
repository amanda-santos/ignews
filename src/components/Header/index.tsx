import { SignInButton } from "..";
import { ActiveLink } from "../ActiveLink";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-content"]}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles["active"]} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles["active"]} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};
