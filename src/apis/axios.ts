import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5001",
  // baseURL: "https://todolistbackend.azurewebsites.net",
});

export default instance;
