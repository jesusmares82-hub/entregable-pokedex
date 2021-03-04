import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import ReactPaginate from "react-paginate";
import pokemonlogo from "../img/pokemon.png";
import axios from "axios";
import Pokedex from "./Pokedex";
import Spinner from "./Spiner";
import SearchBox from "./SearchBox";

const PublicPage = ({ children, ...props }) => {
  const [pokes, setPokes] = useState([]);
  const [pokemon, setPokemon] = useState("");
  const [query, setQuery] = useState("");
  const [queryName, setQueryName] = useState("");
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);

  const [hasData, setHasData] = useState(true);

  const [showResults, setShowResults] = useState(false);

  const [isData, setIsData] = useState("");

  const { user } = useAuth();
  console.log(user);

  const getData = async () => {
    if (query) {
      const res = await axios.get(`https://pokeapi.co/api/v2/type/${query}/`);
      const data = res.data.pokemon;
      //console.log(data);
      const slices = data.slice(offset, offset + perPage);
      const postData = slices.map((value) => (
        <Pokedex
          key={value.pokemon.name}
          name={value.pokemon.name}
          type={query}
          url={value.pokemon.url}
        />
      ));
      setPokes(postData);
      setPageCount(Math.ceil(data.length / perPage));
      setHasData(true);
      setIsData(query);
    }
  };

  const getDataPokemon = () => {
    if (queryName) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${queryName}/`)
        .then((res) => {
          setPokemon(res.data);
          setShowResults(true);
          setHasData(true);
          setIsData(queryName);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [query, offset]);

  useEffect(() => {
    getDataPokemon();
  }, [queryName]);

  useEffect(() => {
    if (isData) {
      getDataPokemon();
    }
  }, []);

  const handleSearchName = (value, setSearchTerm) => {
    setQueryName(value);
    setSearchTerm("");
  };

  const handleSearchType = (value) => {
    setQuery(value);
  };

  const handleClear = () => {
    setQuery("");
    setQueryName("");
    setOffset(0);
    setPerPage(4);
    setPageCount(0);
    setPokes([]);
    setPokemon(null);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setOffset(selectedPage * perPage);
  };

  return (
    <div className="text-center poke-details">
      <h6 className="text-center">
        <strong>Welcome: {user}</strong>
      </h6>
      <img src={pokemonlogo} alt="pokemon-logo" />
      <div>
        <SearchBox
          handleSearchTermType={handleSearchType}
          handleSearchTermName={handleSearchName}
          handleClearTerm={handleClear}
        />
      </div>
      {hasData ? (
        <>
          {pokes.length > 0 && (
            <>
              <ReactPaginate
                className="color-text-a text-center"
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={""}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={0}
                pageRangeDisplayed={9}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />

              <div className="pokegallery">{pokes}</div>
            </>
          )}

          {pokemon && (
            <>
              <div
                className={
                  pokemon
                    ? " my-card normal pt-3 mx-auto show"
                    : "my-card normal pt-3 hide"
                }
              >
                {pokemon.sprites && (
                  <img
                    className="img-container"
                    width="100px"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                  />
                )}
                {pokemon.name && (
                  <h5
                    className="font-family"
                    style={{
                      margin: 3,
                    }}
                  >
                    <Link to={`/pokedex/pokemon/${pokemon.id}`}>
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </Link>
                  </h5>
                )}
                <span className="number">#{pokemon.id}</span>
                {pokemon.types && (
                  <h6 className="font-family">
                    <strong>
                      Type:
                      {pokemon.types[0].type.name.charAt(0).toUpperCase() +
                        pokemon.types[0].type.name.slice(1)}{" "}
                    </strong>
                  </h6>
                )}
                {pokemon.stats && (
                  <div className="bg-color-white pl-2 pr-2 mt-4">
                    <h6 className="font-family text-center ">
                      <strong>
                        <p>
                          {" "}
                          {pokemon.stats[0].stat.name.charAt(0).toUpperCase() +
                            pokemon.stats[0].stat.name.slice(1)}
                          : {pokemon.stats[0].base_stat}{" "}
                        </p>
                        <span>
                          {" "}
                          {pokemon.stats[1].stat.name.charAt(0).toUpperCase() +
                            pokemon.stats[1].stat.name.slice(1)}
                          : {pokemon.stats[1].base_stat}{" "}
                        </span>
                        <span>
                          {" "}
                          {pokemon.stats[2].stat.name.charAt(0).toUpperCase() +
                            pokemon.stats[2].stat.name.slice(1)}
                          : {pokemon.stats[2].base_stat}{" "}
                        </span>
                        <p>
                          {" "}
                          {pokemon.stats[5].stat.name.charAt(0).toUpperCase() +
                            pokemon.stats[5].stat.name.slice(1)}
                          : {pokemon.stats[5].base_stat}{" "}
                        </p>
                      </strong>
                    </h6>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PublicPage;
