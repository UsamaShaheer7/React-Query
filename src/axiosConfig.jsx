import { useQuery, useMutation, useQueryClient } from "react-query";
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
export const useGetRequest = (url, options = {}) => {
  return useQuery(
    [url],
    () => axiosInstance.get(url).then((res) => res.data),
    options
  );
};

// Custom hook for POST requests
export const usePostRequest = (url, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload) => axiosInstance.post(url, payload).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([url]);
      },
      ...options,
    }
  );
};

export const usePostRequestFormData = (url, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload) => {
      const formData = new FormData();
      for (const key in payload) {
        if (payload[key] instanceof Array) {
          payload[key].forEach((file) => {
            formData.append(key, file);
          });
        } else formData.append(key, payload[key]);
      }
      return axiosInstance
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([url]);
      },
      ...options,
    }
  );
};

export const usePatchRequest = (url, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload) => axiosInstance.patch(url, payload).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([url]);
      },
      ...options,
    }
  );
};

export const useDeleteRequest = (url, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(() => axiosInstance.delete(url).then((res) => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries([url]);
    },
    ...options,
  });
};

export const useInfiniteQuery = (url, options = {}) => {
  return useQuery(
    url,
    async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(url, {
        params: {
          page: pageParam,
        },
      });
      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.hasNextPage) {
          return pages.length + 1;
        }
        return undefined;
      },
      ...options,
    }
  );
};
