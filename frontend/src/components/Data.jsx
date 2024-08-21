import React from "react";

function Data({ data }) {
  return (
    <div>
      <ul className="list-group">
        {data.map((item) => (
          <li className="list-group-item mt-4" key={item.cases}>
            Country: {item.country} Confirmed Cases: {item.confirmed} Deaths:{" "}
            {item.deaths} Recovered:
            {item.recovered}
            Active Cases:
            {item.active}
            New Cases:
            {item.newCases}
            New Deaths:
            {item.newDeaths}
            New Record:
            {item.newRecords}
            Deaths Per hundred:
            {item.deathsPerHundred}
            Recover Per hundred:
            {item.recoverPerHundred}
            One Week Change:
            {item.oneweekChange}Increased Cases in One week :{item.recovered}WHO
            report:
            {item.whoRegion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Data;
