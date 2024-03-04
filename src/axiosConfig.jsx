// import axios from "axios";
// import { useQuery, useMutation } from 'react-query';

// export const getFetchData = async (URL) => {
//   const response = await axios.get(URL);
//   return response.data;
// };
// export const postFetchData = async (URL, payload) => {
//   const response = await axios.post(URL, payload);
//   return response.data;
// };

import { useQuery, useMutation } from "react-query";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      
      localStorage.removeItem("token"); 
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

// Custom hook for GET requests
export function useGetRequest(queryKey, URL) {
  return useQuery(queryKey, async () => {
    const response = await axiosInstance.get(URL);
    return response.data;
  });
}

// Custom hook for POST requests
export function usePostRequest(queryKey, URL) {
  return useMutation(async (payload) => {
    const response = await axiosInstance.post(URL, payload);
    return response.data;
  });
}

// Custom hook for POST requests with FormData
export function usePostRequestFormData(queryKey, URL) {
  return useMutation(async (payload) => {
    const formData = new FormData();
    for (const key in payload) {
      if (payload[key] instanceof Array) {
        payload[key].forEach((file) => {
          formData.append(key, file);
        });
      } else formData.append(key, payload[key]);
    }
    const response = await axiosInstance.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  });
}

// Custom hook for PATCH requests
export function usePatchRequest(queryKey, URL) {
  return useMutation(async (payload) => {
    const response = await axiosInstance.patch(URL, payload);
    return response.data;
  });
}

// Custom hook for DELETE requests
export function useDeleteRequest(queryKey, URL) {
  return useMutation(async () => {
    await axiosInstance.delete(URL);
  });
}
