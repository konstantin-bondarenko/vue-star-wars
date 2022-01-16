import Vue from "vue";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://swapi.dev/api/",
});

Vue.prototype.$axios = axiosInstance;

export default axiosInstance;
