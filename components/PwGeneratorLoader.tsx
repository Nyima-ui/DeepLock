import styles from "./PwGeneratorLoader.module.css";

const PwGeneratorLoader = () => {
  return (
    // <div className={`mt-7.5 max-sm:mt-5 ${styles.pwGeneratorLoader}`}></div>
    <div className={`mt-7.5 max-sm:mt-5 w-148.5 max-xl:w-auto ${styles.pwGeneratorLoader}`}>
      <div className={styles.box1}></div>
      <div className={styles.box2}></div>
      <div className={styles.box3}></div>
    </div>
  );
};

export default PwGeneratorLoader;
