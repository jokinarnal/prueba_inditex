import React from "react";
import {
  useLoaderData,
} from "react-router-dom";

export function Component(props) {
 
let data = useLoaderData();
console.log(data)
  return (
    <>
      <h1>List</h1>
      { /* JSON.stringify(data) */ }
    </>
  );
}
