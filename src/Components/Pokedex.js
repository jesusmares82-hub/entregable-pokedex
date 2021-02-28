import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pokedex = ({ name, url, type }) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonShiny, setPokemonShiny] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState(null);
  const [imageShown, setImageShown] = useState(pokemon);

  useEffect(() => {
    const promise = axios(url);

    promise.then((res) => {
      setPokemon(res.data.sprites.front_default);
      setPokemonTypes(res.data.types);
      setPokemonShiny(
        res.data.sprites.front_shiny
          ? res.data.sprites.front_shiny
          : res.data.sprites.front_default
      );
      setImageShown(res.data.sprites.front_default);
    });
  }, []);

  return (
    <div
      className={
        type === "electric"
          ? "my-card electric"
          : type === "steel"
          ? "my-card steel"
          : type === "water"
          ? "my-card water"
          : type === "bug"
          ? "my-card bug"
          : type === "grass"
          ? "my-card grass"
          : type === "dragon"
          ? "my-card dragon"
          : type === "fire"
          ? "my-card fire"
          : type === "ice"
          ? "my-card ice"
          : type === "normal"
          ? "my-card normal"
          : type === "flying"
          ? "my-card flying"
          : type === "rock"
          ? "my-card rock"
          : type === "psychic"
          ? "my-card psychic"
          : type === "fairy"
          ? "my-card fairy"
          : type === "ground"
          ? "my-card ground"
          : type === "poison"
          ? "my-card poison"
          : type === "fighting"
          ? "my-card fighting"
          : type === "dark"
          ? "my-card dark"
          : type === "ghost"
          ? "my-card ghost"
          : type === "shadow"
          ? "my-card shadow"
          : type === "unknow"
          ? "my-card unknow"
          : "my-card normal"
      }
    >
      <img
        className="img-container"
        src={imageShown}
        alt={"No photo available"}
        onMouseOver={() => setImageShown(pokemonShiny)}
        onMouseLeave={() => setImageShown(pokemon)}
      />
      <h2
        className="font-family"
        style={{
          margin: 3,
        }}
      >
        <Link>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
      </h2>
      <h6 className="font-family">
        <strong>
          Types:
          {pokemonTypes &&
            pokemonTypes.map((value, index) => {
              return (
                <span key={value.type.name + index}>
                  {index === 1 ? " /" : " "}{" "}
                  {value.type.name.charAt(0).toUpperCase() +
                    value.type.name.slice(1)}
                </span>
              );
            })}
        </strong>
      </h6>
    </div>
  );
};

export default Pokedex;
