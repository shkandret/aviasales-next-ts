import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { pagination } from "@/store/reducers/ticketsSlice";

import Sidebar from "@/components/Sidebar";
import Button from "@/components/Button";
import Filters from "@/components/Filters";
import CardList from "@/components/CardList";

import imgLogo from "@/images/logo.svg";

import styles from "./App.module.scss";

const App = () => {
  const dispatch = useAppDispatch();
  const { filteredTickets } = useAppSelector((state) => state.tickets);

  return (
    <div className={styles["app"]}>
      <div className={styles["app__wrapper"]}>
        <Image src={imgLogo} alt="logo" className={styles["app__logo"]} />
        <div className={styles["app__content"]}>
          <Sidebar />
          <div className={styles["app__content-right"]}>
            <Filters />
            <CardList />
            {filteredTickets.length !== 0 && (
              <Button onClick={() => dispatch(pagination())}>
                ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
