import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokedex from "./Pokedex";
import SearchBox from "./SearchBox";

const ProtectedPage = ({ children, ...props }) => {
  const [pokes, setPokes] = useState([]);
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (query) {
      const promise = axios(`https://pokeapi.co/api/v2/type/${query}/`);

      promise.then((res) => {
        setPokes(res.data.pokemon.slice(0, amount));
      });
    }
  }, [query]);

  const handleSearch = (value, setSearchTerm, value2, setFilterTerm) => {
    setQuery(value);
    setSearchTerm("");
    setAmount(value2);
    setFilterTerm(10);
  };

  const handleClear = (value) => {
    setQuery("");
    setPokes([]);
  };

  const arrayPokemon = pokes.map((value) => {
    return (
      <Pokedex
        key={value.pokemon.name}
        name={value.pokemon.name}
        type={query}
        url={value.pokemon.url}
      />
    );
  });
  console.log(arrayPokemon);

  return (
    <div>
      <h1 className="text-center">
        <strong>POKEDEX</strong>
      </h1>
      <div>
        <SearchBox
          handleSearchTerm={handleSearch}
          handleClearTerm={handleClear}
        />
      </div>
      {pokes.length > 0 && (
        <>
          <div className="pokegallery">{arrayPokemon}</div>
        </>
      )}
    </div>
  );
};

export default ProtectedPage;
