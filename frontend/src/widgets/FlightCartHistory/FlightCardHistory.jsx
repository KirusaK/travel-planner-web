import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightCardHistory.module.scss";

export const FlightCardHistory = ({item}) => {
    const icons = {
        flight: "#icon-Frame1",
        hotel: "#icon-Frame2",
    };

    return (
        <div>
            <section>
                {item.covel ? (
                    <img
                        src={item.logo}
                        alt={item.airlineName}
                        className={styles.hotelCard_image}
                    />
                ) : (
                    <svg>
                        <use href={sprite + icons[item.itemType]}/>
                    </svg>
                )}
            </section>
        </div>
    )
}