export const getFiltered = ({ data, activeTab}) => {

    const Flights = data.filter(
        (item) => item.itemType === "flight" || item.airlineName
    );

    const Places = data.filter((item) => item.itemType === "hotel" || item.location);

    return activeTab === "flights" ? Flights : Places;
}