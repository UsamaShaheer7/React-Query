

import React from "react";
import { useGetRequest } from "../axiosConfig";
import { useEffect } from "react";

const ReactQuery = () => {

  const { refetch, data, isLoading, error } = useGetRequest(
    "https://jsonplaceholder.typicode.com/posts"
  );
  useEffect(() => {
    refetch()
      .then((res) => {})
      .catch((error) => {});
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.body}</div>
        </div>
      ))}
    </div>
  );
};

export default ReactQuery;
