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
  fullUrl = null,
) {
  try {
    console.log("API URL => ", fullUrl ? fullUrl : API_CONFIG.baseUrl + endpoint);
    const response = await axios({
      method: method.toUpperCase(),
      url: fullUrl ? fullUrl : API_CONFIG.baseUrl + endpoint,
      data,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: "internHub__" + localStorage.getItem("token"),
        "X-API-Key": "internHub__" + localStorage.getItem("token"),
      },
    });

    printResponse(response);
    return response.data;
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
