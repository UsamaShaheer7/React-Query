import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { postFetchData } from "../axiosConfig";

const PostReactQuery = () => {
  const payload = {
    title: "react query",
    body: "this is the payload body ......................",
    userId: 1,
  };

  const { mutate, data, isLoading, isError, isSuccess, error } = useMutation(
    () => {
      return postFetchData(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );
    }
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  console.log("mutation data", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error:{error.message}</p>;
  }

  if (isSuccess) {
    return <p>Mutation successful</p>;
  }

  return <></>;
};

export default PostReactQuery;
