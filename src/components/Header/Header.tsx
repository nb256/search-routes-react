import styles from "./Header.module.css";
import mozioLogo from "../../assets/mozio-logo.svg";

export default function Header() {
  return (
    <header className={styles.firstHeader}>
      <img src={mozioLogo} className={styles.mozioLogo} alt="logo" />
    </header>
  );
}
