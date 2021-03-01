import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Pokedex from "./Pokedex";
import SearchBox from "./SearchBox";

const PublicPage = ({ children, ...props }) => {
  const [pokes, setPokes] = useState([]);
  const [query, setQuery] = useState("");
  //const [amount, setAmount] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    if (query) {
      const res = await axios.get(`https://pokeapi.co/api/v2/type/${query}/`);
      const data = res.data.pokemon;
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
    }
  };

  useEffect(() => {
    getData();
  }, [query, offset]);

  /*useEffect(() => {
    if (query) {
      const promise = axios(`https://pokeapi.co/api/v2/type/${query}/`);

      promise.then((res) => {
        //setPokes(res.data.pokemon.slice(0, amount));
        const data = res.data.pokemon;
        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((value) => {
          return (
            <Pokedex
              key={value.pokemon.name}
              name={value.pokemon.name}
              type={query}
              url={value.pokemon.url}
            />
          );
        });
        setPokes(postData);
        setPageCount(Math.ceil(data.length / perPage));
      });
    }
  }, [query, offset]);*/

  const handleSearch = (value, setSearchTerm, value2, setFilterTerm) => {
    setQuery(value);
    setSearchTerm("");
    //setAmount(value2);
    setFilterTerm(10);
  };

  const handleClear = (value) => {
    setQuery("");
    setOffset(0);
    setPerPage(10);
    setPageCount(0);
    setPokes([]);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setOffset(selectedPage * perPage);
  };

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
          <ReactPaginate
            className="color-text-a"
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          <div className="pokegallery">{pokes}</div>
        </>
      )}
    </div>
  );
};

export default PublicPage;
