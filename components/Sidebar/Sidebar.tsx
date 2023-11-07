import useSidebar from "@/hooks/useSidebar";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { inputs } = useSidebar();

  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar__title"]}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <div className={styles["sidebar__boxes"]}>
        {inputs.map((item) => (
          <div key={item.id} className={styles["sidebar__boxes-item"]}>
            <input
              id={item.id}
              className={styles["sidebar__input"]}
              type="checkbox"
              onChange={item.func}
              checked={item.checked}
            />
            <label className={styles["sidebar__label"]} htmlFor={item.id}>
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
