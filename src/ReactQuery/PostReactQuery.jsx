// import React, { useEffect } from "react";
// import { useMutation } from "react-query";
// import { postFetchData } from "../axiosConfig";

// const PostReactQuery = () => {
//   const payload = {
//     title: "react query",
//     body: "this is the payload body ......................",
//     userId: 1,
//   };

//   const { mutate, isLoading, isError, isSuccess, error } =
//     useMutation(() => {
//       return postFetchData(
//         "https://jsonplaceholder.typicode.com/posts",
//         payload
//       );
//     });

//   useEffect(() => {
//     mutate();
//   }, [mutate]);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error:{error.message}</p>;
//   }

//   if (isSuccess) {
//     return <p>Mutation successful</p>;
//   }

//   return <></>;
// };

// export default PostReactQuery;
import React, { useEffect } from "react";
import { usePostRequest } from "../axiosConfig";

const PostReactQuery = () => {
  const payload = {
    title: "react query",
    body: "this is the payload body ......................",
    userId: 1,
    id: 101,
  };

  const { mutate, isLoading, isError, isSuccess, error, data } = usePostRequest(
    "https://jsonplaceholder.typicode.com/posts"
  );
  useEffect(() => {
    // mutateAsync(payload);
    mutate(payload, {
      onSuccess: (res) => {
        console.log("res", res);
      },
      onError: (err) => {
        console.log(`Error: ${err.message}`);
      },
    });
  }, []);

  return (
    <div>
      {isLoading && <div>loading....</div>}
      {isError && <div>Error: {error.message}</div>}
      {isSuccess && <div>Success!</div>}
    </div>
  );
};

export default PostReactQuery;
