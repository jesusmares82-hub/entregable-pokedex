import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";

const Home = () => {
  let history = useHistory();
  return (
    <div>
      <h4>Welcome to Pokedex by Squad 12.</h4>
      <p>March 2020.</p>
      <Button
        className="mb-3"
        variant="outline-dark"
        onClick={() => history.goBack()}
      >
        <TiArrowBackOutline /> Back
      </Button>{" "}
    </div>
  );
};

export default Home;
