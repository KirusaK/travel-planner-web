import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {useAuth} from "./AuthContext.jsx";
import {addFavourites, deleteFavourite, getFavourites} from "../api/favourites.js";

const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children }) => {
    const {user} = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(Boolean(user));
    const pending = useRef(new Set());

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);

        getFavourites()
            .then((rows) => {
                if (!cancelled) setFavorites(rows);
            })
            .catch((err) => console.error("Failed to load favorites:", err))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        }
    }, [user?.id]);

    const isFavorite = useCallback(
        (type, id) => favorites.some((f) => f.item_type === type && String(f.item_id) === String(id)),
        [favorites]
    );

    const toggle = useCallback(
        async (type, id) => {
            const key = `${type}:${id}`;
            if (pending.current.has(key)) return; // защита от двойного клика
            pending.current.add(key);

            const item = { item_type: type, item_id: String(id) };
            const isSame = (f) => f.item_type === type && String(f.item_id) === String(id);

            try {
                if (isFavorite(type, id)) {
                    setFavorites((prev) => prev.filter((f) => !isSame(f)));
                    try {
                        await deleteFavourite(type, id);
                    } catch (err) {
                        setFavorites((prev) => [item, ...prev]); // откат
                        throw err;
                    }
                } else {
                    setFavorites((prev) => [item, ...prev]);
                    try {
                        await addFavourites(type, id);
                    } catch (err) {
                        setFavorites((prev) => prev.filter((f) => !isSame(f))); // откат
                        throw err;
                    }
                }
            } finally {
                pending.current.delete(key);
            }
        },
        [isFavorite],
    );

    const value = useMemo(
        () => ({ favorites, loading, isFavorite, toggle }),
        [favorites, loading, isFavorite, toggle],
    );

    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
};


export const useFavorites = () => {
    const ctx = useContext(FavouritesContext);
    if (!ctx) throw new Error("useFavorites must be used within FavouritesProvider");
    return ctx;
};