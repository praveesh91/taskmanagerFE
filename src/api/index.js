import React from "react";
import axios from "axios";
import localforage from "localforage";
import { message } from "antd";

const axiosAPI = axios.create({
  baseURL: `http://localhost:3002`,
});

const requestHandler = async (req) => {
  const token = localStorage.getItem("tokenId");
  console.log({ token });
  req.headers.Authorization = `Bearer ${token}`;
  return req;
};

const responseHandler = async (res) => {
  if (res.status === 401 || res.status === 404) {
    message.error("Unable to authenticate");
  }
  return res;
};

const errorHandler = async (err) => {
  return Promise.reject(err);
};

axiosAPI.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosAPI.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosAPI;
