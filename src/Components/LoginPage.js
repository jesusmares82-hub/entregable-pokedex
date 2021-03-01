import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const LoginPage = () => {
  const history = useHistory();
  console.log(history);
  const { signIn } = useAuth();
  return (
    <button
      onClick={() =>
        signIn(() => {
          history.push(`/pokemon/:id`);
        })
      }
    >
      Login
    </button>
  );
};

export default LoginPage;
