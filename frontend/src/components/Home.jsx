import React from "react";

function Home() {
  return (
    <div class="card w-50" style={{ width: "18rem" }}>
      <p>
        During the Pandemic in the world 2019-2021, the whole world was
        struggling with corona virus.
        <hr />
        This is the data that shows whats the related details were based on the
        countries.
      </p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCV4XpULtM_9495fo2D1VgN0s9zkVO0bcPuQ&s"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <p class="card-text">This is the website where you can add the data</p>
      </div>
      <h1>
        Welcome to the Website -{" "}
        <span style={{ color: "dark-green" }}>Corona explorer</span>
      </h1>
    </div>
  );
}

export default Home;
