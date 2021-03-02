import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";

const EncountersPokemon = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <p>çhola</p>
    </div>
  );
};

export default EncountersPokemon;
