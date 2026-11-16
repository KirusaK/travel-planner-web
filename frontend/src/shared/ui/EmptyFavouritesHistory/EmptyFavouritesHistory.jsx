import styles from "./EmptyFavouritesHistory.module.scss";

export const EmptyFavouritesHistory = ({subTitle}) => {
    return (
        <div className={styles.empty}>
            <h2>No history found</h2>
            <p>
                {subTitle}
            </p>
        </div>
    );
}