import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Button from "react-bootstrap/Button";
import { RiLoginCircleLine } from "react-icons/ri";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  console.log(history);
  const { signIn, user, setUser } = useAuth();
  console.log(user);

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
