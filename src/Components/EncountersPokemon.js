import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";

const EncountersPokemon = () => {
  let { id } = useParams();
  const [encounters, setEncounters] = useState(id);
  const [data, setData] = useState();
  const [dataRender, setDataRender] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${encounters}/encounters`)
      .then((dataApi) => {
        console.log(dataApi);
        setData(dataApi);
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
      <Link to="/pokedex">Ir a el Listado</Link>
    </div>
  );
};

export default EncountersPokemon;
