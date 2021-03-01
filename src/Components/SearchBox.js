import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const SearchBox = ({ handleSearchTerm, handleClearTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState(10);

  return (
    <div>
      <InputGroup className="mb-3 input-custom-select ">
        <FormControl
          placeholder="Filter pokemon..."
          value={searchTerm}
          style={{
            width: "20rem",
            backgroundColor: "#f4f9f9",
          }}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value.toLowerCase());
          }}
        />
        <InputGroup.Append>
          <Button
            variant="outline-primary"
            onClick={() =>
              handleSearchTerm(
                searchTerm,
                setSearchTerm,
                filterTerm,
                setFilterTerm
              )
            }
          >
            Search
          </Button>
          <Button variant="outline-danger" onClick={() => handleClearTerm()}>
            Clear
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default SearchBox;
