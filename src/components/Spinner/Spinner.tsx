import styles from "./Spinner.module.scss";

type Props = {};

export default function Spinner({}: Props) {
  return (
    <div className={styles.spinnerContainer}>
      <svg viewBox="25 25 50 50" className={styles.spinner}>
        <circle r="20" cy="50" cx="50" className={styles.circle}></circle>
      </svg>
    </div>
  );
}
