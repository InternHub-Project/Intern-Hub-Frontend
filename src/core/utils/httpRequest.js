import axios from "axios";
import { notifications } from "@mantine/notifications";
import API_CONFIG from "./apiConfig.js";

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export async function httpRequest(
  endpoint,
  method = HTTP_METHODS.GET,
  data = {},
  headers = {},
  queryParameters = {},
  fullUrl = null,
) {
  try {
    let url = prepareUrl();
    const response = await axios({
      url: url,
      method: method.toUpperCase(),
      data,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: "internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTMzNDk3MzMsImV4cCI6MTcxMzQzNjEzM30.2L_IFmoS0jP1k0NX-QN9gMYyQR1kSmZcpMlrlKIxmtI",
        "X-API-Key": "internHub__" + localStorage.getItem("token"),
      },
      withCredentials:true
    });

    printResponse(response);
    return response;
  } catch (error) {
    printError(error);
    if (error.response.data.message) {
      notifications.show({
        message: `${error.response.data.message}`,
        color: "red",
      });
    } else {
      notifications.show({
        message: "Something went wrong",
        color: "red",
      });
    }
    throw error;
  }

  function prepareUrl() {
    let url = fullUrl ? fullUrl : API_CONFIG.baseUrl + endpoint;
    if (Object.keys(queryParameters).length > 0) {
      const queryString = new URLSearchParams(queryParameters).toString();
      url += `?${queryString}`;
    }
    return url;
  }

  function printResponse(response) {
    console.log("API URL => ", API_CONFIG.baseUrl + endpoint);
    console.log("API response => ", response);
    console.log("API response.data => ", response.data);
  }

  function printError(error) {
    console.error("Error fetching data => ", error);
    console.error("Error message => ", error.message);
    console.error("err.response.data.message => ", error.response.data.message);
  }
}
