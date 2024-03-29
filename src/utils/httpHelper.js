import API_CONFIG from "./apiConfig.js";

import axios from 'axios';

export async function httpRequest(endpoint, method = 'GET', data = {}, headers = {}) {
    try {
        const response = await axios({
            method: method.toUpperCase(),
            url: API_CONFIG.baseUrl + endpoint,
            data,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Authorization': 'internHub__' + localStorage.getItem('token'),
                'X-API-Key': 'internHub__' + localStorage.getItem('token'),
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data => ', error);
        console.error('Error message => ', error.message);
        console.error('err.response.data.message => ', error.response.data.message);
        throw error;
    }
}

