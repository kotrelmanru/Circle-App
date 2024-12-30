import axios from "axios";

export const API = axios.create({
   baseURL: "http://localhost:3000",
});

export const setAuthToken = (token?: string) => {
   if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   } else {
      delete API.defaults.headers.common["Authorization"];
   }
};
