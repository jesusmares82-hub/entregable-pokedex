import React from "react";
import { useParams } from "react-router-dom";

const ProtectedPage = ({ children, ...props }) => {
  const { id } = useParams();
  console.log(id);
  return <span>Protected Page</span>;
};

export default ProtectedPage;
