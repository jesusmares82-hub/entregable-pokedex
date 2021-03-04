import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";

const EncountersPokemon = () => {
  let { id } = useParams();

  let history = useHistory();
  const [encounters, setEncounters] = useState(id);
  const [data, setData] = useState();
  const [dataRender, setDataRender] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${encounters}/encounters`)
      .then((dataApi) => {
        setData(dataApi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [encounters]);

  useEffect(() => {
    if (data) {
      const renderLocation = data.data.map((values, index) => (
        <div key={values + index}>
          <p>
            <FaMapMarkedAlt /> Location area: {values.location_area.name}
          </p>
        </div>
      ));
      setDataRender(renderLocation);
    }
  }, [data]);

  return (
    <div>
      <h2> {"Encounters: "}</h2>
      {dataRender.length > 0 ? (
        <h5>{dataRender && dataRender}</h5>
      ) : (
        <h5 className="mt-3 mb-5">
          {" "}
          <SiOpenstreetmap /> Location not found
        </h5>
      )}
      <Button
        className="mt-5 mb-3"
        variant="outline-info"
        onClick={() => history.goBack()}
      >
        <TiArrowBackOutline /> Back
      </Button>{" "}
    </div>
  );
};

export default EncountersPokemon;
