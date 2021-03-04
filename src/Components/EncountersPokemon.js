import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Spinner from "./Spiner";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useLocation, useParams } from "react-router-dom";

const EncountersPokemon = () => {
  let { id } = useParams();
  let history = useHistory();
  const [encounters, setEncounters] = useState(id);
  const [data, setData] = useState();
  const [dataRender, setDataRender] = useState();

  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${encounters}/encounters`)
      .then((dataApi) => {
        setData(dataApi);
        setHasData(true);
      });
  }, [encounters]);

  useEffect(() => {
    if (data) {
      const renderLocation = data.data.map((values, index) => (
        <p key={index}>{values.location_area.name}</p>
      ));
      setDataRender(renderLocation);
    }
  }, [data]);

  return (
    <div>
      <h2> {"Encounters: "}</h2>
      {dataRender && dataRender}
      <Button
        className="mb-3"
        variant="outline-info"
        onClick={() => history.goBack()}
      >
        <TiArrowBackOutline /> Back
      </Button>{" "}
    </div>
  );
};

export default EncountersPokemon;
