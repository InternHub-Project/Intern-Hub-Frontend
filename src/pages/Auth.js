import axios from "axios";
import API_CONFIG from "../core/utils/apiConfig.js";

export const isAuthenticated = async() => {
  if(!localStorage.getItem("userInfo")&&!JSON.parse(localStorage.getItem("userInfo")).data.token){
    return false
  }
  else {
    const response = await axios({
      method: "post",
      url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.isTokenValid}`,
      headers:{Authorization:`${API_CONFIG.secretKey}${JSON.parse(localStorage.getItem("userInfo")).data.token}`,"Content-Type":"application/json"}
  });
  return response.data.data;
}
  };