import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./styles.module.scss";

export const SignInButton = () => {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={styles["sign-in-button"]}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session?.user?.name}
      <FiX color="#737380" className={styles["close-icon"]} />
    </button>
  ) : (
    <button
      type="button"
      className={styles["sign-in-button"]}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
};
