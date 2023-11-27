import { useQuery } from "react-query";
import React from "react";
import { getFetchData } from "../axiosConfig"; // Adjust the path based on your project structure

const ReactQuery = () => {
  const { data, isLoading, error } = useQuery("myQueryKey", () =>
    getFetchData("https://jsonplaceholder.typicode.com/posts")
  );

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
