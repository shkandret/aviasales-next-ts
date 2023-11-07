import Image from "next/image";

import formatDates from "@/utils/formatDates";
import formatArrive from "@/utils/formatArrive";
import formatPrice from "@/utils/formatPrice";

import { ITicket } from "@/types/types";

import styles from "./Card.module.scss";

const Card = ({ price, carrier, segments }: ITicket) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__wrapper"]}>
        <div className={styles["card__header"]}>
          <div className={styles["card__header-price"]}>
            {formatPrice(price)} P
          </div>
          <Image
            src={`http://pics.avs.io/99/36/${carrier}.png`}
            width={110}
            height={36}
            alt="logo"
          />
        </div>
        <div className={styles["card__body"]}>
          {segments.map((item) => (
            <div
              key={`${item.duration}_${item.date}`}
              className={styles["card__body-items"]}
            >
              <div className={styles["card__body-item"]}>
                <div className={styles["card__item-title"]}>
                  {item.origin} - {item.destination}
                </div>
                <div className={styles["card__item-info"]}>
                  {formatDates(item.date, item.duration)}
                </div>
              </div>
              <div className={styles["card__body-item"]}>
                <div className={styles["card__item-title"]}>В ПУТИ</div>
                <div className={styles["card__item-info"]}>
                  {formatArrive(item.duration)}
                </div>
              </div>
              <div className={styles["card__body-item"]}>
                <div className={styles["card__item-title"]}>
                  {item.stops.length} ПЕРЕСАДКИ
                </div>
                <div className={styles["card__item-stops"]}>
                  {item.stops.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
