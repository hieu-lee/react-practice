import React from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://todolistbackend.azurewebsites.net",
});

export default instance;
