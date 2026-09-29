const API_URL = "http://localhost:5000/api/venues";

export const getVenues = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch venues");
    }

    return await response.json();
};