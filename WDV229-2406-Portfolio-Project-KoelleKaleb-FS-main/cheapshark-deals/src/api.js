import axios from 'axios';

const API_BASE_URL = 'https://www.cheapshark.com/api/1.0';

export const fetchDeals = async () => {
    const response = await axios.get(`${API_BASE_URL}/deals?storeID=1&upperPrice=15`);
    return response.data;
};

export const fetchDealById = async (id) => {
    const encodedId = encodeURIComponent(id);
    const apiUrl = `${API_BASE_URL}/deals?id=${encodedId}`;
    console.log('Fetching deal with URL:', apiUrl);
    try {
        const response = await axios.get(apiUrl);
        console.log('Response data:', response.data); // Log response data for debugging
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Deal with ID ${id} not found.`);
            throw new Error('Deal not found.');
        } else {
            console.error(`Error fetching deal by id ${id}:`, error); // Log detailed error for other types of errors
            throw error;
        }
    }
};

export const searchDeals = async (query) => {
    const response = await axios.get(`${API_BASE_URL}/deals`, {
        params: {
            title: query,
        },
    });
    return response.data;
};
