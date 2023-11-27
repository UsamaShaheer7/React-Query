import axios from "axios";
export const getFetchData = async (URL) => {
  const response = await axios.get(URL);
  return response.data;
};
export const postFetchData = async (URL, payload) => {
  const response = await axios.post(URL, payload);
  return response.data;
};
