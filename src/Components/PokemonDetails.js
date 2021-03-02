import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  //if (posts) {
  //const post = posts.find((value) => value.id === Number(id));
  //}
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setPokemon(res.data);
            setPokemonAbilities(res.data.abilities);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div>
      {pokemon && (
        <>
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <img
            width="150px"
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
          <p>{id}</p>
          <h6 className="font-family">
            <strong>
              Abilities:{" "}
              {pokemonAbilities &&
                pokemonAbilities.map((value, index) => {
                  return (
                    <span key={value.ability.name + index}>
                      {index === 1 ? " |" : " "}{" "}
                      {value.ability.name.charAt(0).toUpperCase() +
                        value.ability.name.slice(1)}{" "}
                    </span>
                  );
                })}
            </strong>
          </h6>
        </>
      )}
      <p>
        <Link to="/pokedex/">👈🏻 Back</Link>
      </p>
    </div>
  );
};

export default PokemonDetails;
