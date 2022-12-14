import moz from "../../assets/moz.jpeg";
import styles from "./MainBackground.module.css";

export default function MainBackground() {
  return (
    <div className={styles.container}>
      <div className={styles.secondHeader}></div>
      <img src={moz} className={styles.img} alt="road" />
    </div>
  );
}
