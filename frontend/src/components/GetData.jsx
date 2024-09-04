import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./GetData.css";
import Search from "./../Search";
import Chartjs from "./Chartjs";

const GetData = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState(0);

  const [limit, setLimit] = useState(20);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  // Get All Data;
  const alldata = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/country/all");
      setData(response.data.data);
    } catch (error) {
      setError("Error fetching data from database");
    } finally {
      setLoading(false);
    }
  };

  function getPaginatedUsers() {
    fetch(
      `http://localhost:3000/api/country/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "allData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedUsers();
    // alldata();
  }, []);

  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }

  function gotoPage() {
    <Link to="/details" className="text-decoration-none "></Link>;
  }

  // code for search country's data individually
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:3000/api/country/search/${query}`
    );
    const data = await response.json();

    setResults(data);

    if (query != results.country) {
      console.log("country isnt found");
    }
  };

  function handleChange(inputData) {
    setQuery(inputData);
  }

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div className="data">
      <div>
        <Search setQuery={handleChange} result={results}></Search>
        <br />

        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Deaths</th>
              <th>Recovered</th>
              <th>Active Cases</th>
              <th>New Cases</th>
              {/* Add more headers based on your data */}
            </tr>
          </thead>
          <tbody>
            {results.map((country) => (
              <>
                <tr key={country.cases}>
                  <td>{country.country}</td>
                  <td> {country.deaths}</td>
                  <td> {country.recovered}</td>
                  <td> {country.active}</td>
                  <td> {country.newCases}</td>
                  <div className="chartbtn">
                    {/* <td>
                      <br />

                      {
                        <button className="btn btn-outline-info">
                          <Link to="/chartjs" className="text-decoration-none ">
                            View Chart
                          </Link>
                        </button>
                      }
                    </td> */}
                  </div>

                  {/* Add more columns based on your data */}
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <br />
        <Chartjs ashu={query}></Chartjs>
      </div>
      <div>
        <h1>Pandemic Data</h1>
        <p>This is the data during pandemic of 2019-2020 Corona.</p>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Deaths</th>
              <th>Recovered</th>
              <th>Active Cases</th>
              <th>New Cases</th>
              {/* Add more headers based on your data */}
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <>
                <tr key={user.cases}>
                  <td>{user.country}</td>
                  <td> {user.deaths}</td>
                  <td> {user.recovered}</td>
                  <td> {user.active}</td>
                  <td> {user.newCases}</td>

                  {/* Add more columns based on your data */}
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={10}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default GetData;
