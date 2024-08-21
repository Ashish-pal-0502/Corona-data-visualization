import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const GetData = () => {
  const [data, setData] = useState([]);
  // console.log(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(20);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  // Get current posts;
  const alldata = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/users/all");

      // console.log(response);
      setData(response.data.data);
    } catch (error) {
      setError("Error fetching data from database");
    } finally {
      setLoading(false);
    }
  };

  function getPaginatedUsers() {
    fetch(
      `http://localhost:3000/api/users/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
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

  // if (error) {
  //   return <p>{error}</p>;
  // }

  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }

  function gotoPage() {
    <Link to="/details" className="text-decoration-none "></Link>;
    console.log("clicked");
  }

  return (
    <div>
      <h1>Data from Database</h1>
      <p>
        This is the data during pandemic of 2019-2020 corona is shown based on
        country and some ratio's
      </p>
      <ul className="list-group w-50  p-3  ">
        {data.map((user) => (
          <>
            <li className="list-group-item mt-2" key={user.cases}>
              <button
                type="button"
                class="btn btn-outline-secondary  "
                onClick={gotoPage}
              >
                {" "}
                Country: {user.country}
              </button>
              <button type="button" class="btn btn-outline-primary">
                {" "}
                Deaths: {user.deaths}
              </button>
              <button type="button" class="btn btn-outline-success">
                {" "}
                Recovered: {user.recovered}
              </button>
              <button type="button" class="btn btn-outline-danger">
                {" "}
                Active Cases: {user.active}
              </button>
              <button type="button" class="btn btn-outline-warning">
                {" "}
                New Cases: {user.newCases}
              </button>
            </li>
          </>
        ))}
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
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
  );
};

export default GetData;
