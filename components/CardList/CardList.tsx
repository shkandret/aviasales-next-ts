import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchSearchId, fetchTickets } from "@/store/reducers/ticketsSlice";
import Card from "@/components/Card";

import styles from "./CardList.module.scss";

const CardList = () => {
  const dispatch = useAppDispatch();
  const {
    searchId,
    isStop,
    pagination,
    filteredTickets,
    loading,
    tickets,
    error,
  } = useAppSelector((state) => state.tickets);

  useEffect(() => {
    if (!searchId) dispatch(fetchSearchId());
  }, [dispatch, searchId]);

  useEffect(() => {
    if (!isStop && searchId && loading !== "pending") {
      dispatch(fetchTickets());
    }
  }, [searchId, isStop, tickets, error, dispatch, loading]);

  return (
    <div className={styles["cardList"]}>
      {!isStop && <div>Loading...</div>}
      {filteredTickets.length === 0 && (
        <div className={styles["cardList__error"]}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      )}
      {filteredTickets &&
        filteredTickets
          .slice(0, pagination)
          .map((item) => (
            <Card
              key={Math.random()}
              price={item.price}
              carrier={item.carrier}
              segments={item.segments}
            />
          ))}
    </div>
  );
};

export default CardList;
