import React, { useRef } from "react";

const Search = ({ setQuery, result }) => {
  const inputValue = useRef();

  function handleChange(e) {
    e.preventDefault();
    const val = inputValue.current.value;
    setQuery(val);
  }
  return (
    <div>
      <h1>Search in Details</h1>

      <hr />

      <form className="d-flex" onSubmit={handleChange}>
        <input
          className="form-control me-2 w-100"
          type="search"
          placeholder="Enter country name"
          aria-label="Search"
          ref={inputValue}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          onClick={result}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
