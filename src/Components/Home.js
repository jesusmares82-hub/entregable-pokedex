import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import pokemon from "../img/pokemon.png";

const Home = () => {
  let history = useHistory();
  return (
    <div className="mt-5">
      <img src={pokemon} alt="pokemon-logo" />
      <p>Welcome to Pokedex by Squad 12.</p>
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
