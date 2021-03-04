import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Button from "react-bootstrap/Button";
import { RiLoginCircleLine } from "react-icons/ri";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const { signIn, setUser } = useAuth();

  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Type your name..."
          value={userName}
          onChange={(e) => {
            const value = e.target.value;
            setUserName(value);
          }}
        />
        <InputGroup.Append>
          <Button
            variant="outline-primary"
            onClick={() =>
              signIn(() => {
                history.push(`/pokedex`);
                setUser(userName);
              })
            }
          >
            <RiLoginCircleLine /> Login
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default LoginPage;
