import React, { useEffect, useState } from "react";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchBox = ({ handleSearchTerm, handleClearTerm }) => {
  const [searchTermType, setSearchTermType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //const [filterTerm, setFilterTerm] = useState(10);

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  useEffect(() => {
    try {
      axios.get(" https://pokeapi.co/api/v2/type").then((res) => {
        setTypes(res.data.results);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
      setErrorMsg("Types not found.");
    }
  }, []);

  return (
    <div>
      <Form>
        <Form.Group className="pr-5 pl-5">
          <Form.Label>Filter pokemon by types:</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(e) => {
              //const value = e.target.value;
              //console.log(value.toLowerCase());
              //setSearchTermType(e.target.value.toLowerCase());
              //console.log(searchTermType);
              handleSearchTerm(e.target.value.toLowerCase());
            }}
          >
            <option>Select a type</option>
            {types.map((value, index) => {
              return (
                <option key={value.name + index}>
                  {value.name.charAt(0).toUpperCase() + value.name.slice(1)}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form>
      <InputGroup className="pr-5 pl-5">
        <FormControl
          className="custom-select "
          placeholder="Filter pokemon..."
          value={searchTerm}
          style={{
            width: "15rem",
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
            onClick={() => handleSearchTerm(searchTerm, setSearchTerm)}
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
