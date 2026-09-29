const API_URL = "http://localhost:5000/api/departments";

export const getDepartments = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch departments");
    }

    return await response.json();
};