import API_CONFIG from "./apiConfig.js";

import axios from 'axios';
import {notifications} from "@mantine/notifications";

export async function httpRequest(endpoint, method = 'GET', data = {}, headers = {}) {
    try {
        const response = await axios({
            method: method.toUpperCase(), url: API_CONFIG.baseUrl + endpoint, data, headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Authorization': 'internHub__' + localStorage.getItem('token'),
                'X-API-Key': 'internHub__' + localStorage.getItem('token'),
            },
        });

        console.log('API URL => ', API_CONFIG.baseUrl + endpoint);
        console.log('API response => ', response);
        console.log('API response.data => ', response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching data => ', error);
        console.error('Error message => ', error.message);
        console.error('err.response.data.message => ', error.response.data.message);
        if (error.response.data.message) {
            notifications.show({
                message: `${error.response.data.message}`, color: "red",
            });
        } else {
            notifications.show({
                message: "Something went wrong", color: "red",
            });
        }
        throw error;
    }
}

