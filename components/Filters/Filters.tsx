import useFilter from "@/hooks/useFilter";

import styles from "./Filters.module.scss";

const Filters = () => {
  const { active, handleOptimal, handleFaster, handleCheaper } = useFilter();
  return (
    <div className={styles["filters"]}>
      <div
        role="presentation"
        className={
          active === 0 ? styles["filters-active"] : styles["filters__item"]
        }
        onClick={() => handleCheaper()}
      >
        САМЫЙ ДЕШЕВЫЙ
      </div>
      <div
        role="presentation"
        className={
          active === 1 ? styles["filters-active"] : styles["filters__item"]
        }
        onClick={handleFaster}
      >
        САМЫЙ БЫСТРЫЙ
      </div>
      <div
        role="presentation"
        className={
          active === 2 ? styles["filters-active"] : styles["filters__item"]
        }
        onClick={handleOptimal}
      >
        ОПТИМАЛЬНЫЙ
      </div>
    </div>
  );
};

export default Filters;
