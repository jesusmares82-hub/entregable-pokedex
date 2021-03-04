import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Button from "react-bootstrap/Button";
import { RiLoginCircleLine } from "react-icons/ri";

const LoginPage = () => {
  const history = useHistory();
  console.log(history);
  const { signIn } = useAuth();
  return (
    <Button
      className="mt-4 ml-5 buttons-details"
      variant="outline-primary"
      onClick={() =>
        signIn(() => {
          history.push(`/pokedex`);
        })
      }
    >
      <RiLoginCircleLine /> Login
    </Button>
  );
};

export default LoginPage;
