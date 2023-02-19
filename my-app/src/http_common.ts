import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7288/",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
