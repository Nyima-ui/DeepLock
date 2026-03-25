import styles from "./AccessKeyLoader.module.css";

const AccessKeyLoader = () => {
  return (
    <div className={`mt-11.25 ${styles.accessKeyLoader}`}>
      <div className={styles.box1}></div>
      <div className={styles.box2}></div>
      <div className={styles.box3}></div>
      <div className={styles.btn}></div>
    </div>
  );
};

export default AccessKeyLoader;
