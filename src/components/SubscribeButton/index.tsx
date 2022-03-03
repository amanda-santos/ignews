import styles from "./styles.module.scss";

type SubscribeButtonProps = {
  priceId: string;
};

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  return (
    <button type="button" className={styles["subscribe-button"]}>
      Subscribe now
    </button>
  );
};
