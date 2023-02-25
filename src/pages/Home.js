import React, { useState, useEffect } from "react";
import Granim from "granim";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [granimInstance, setGranimInstance] = useState(null);

  useEffect(() => {
    if (granimInstance === null) {
      const instance = new Granim({
        element: "#canvas-basic",
        direction: "custom",
        customDirection: {
          x0: "40%",
          y0: "10px",
          x1: "60%",
          y1: "50%",
        },
        isPausedWhenNotInView: true,
        states: {
          "default-state": {
            gradients: [
              ["#ff9966", "#ff5e62"],
              ["#00F260", "#0575E6"],
              ["#e1eec3", "#f05053"],
            ],
          },
        },
      });
      setGranimInstance(instance);
    } else {
      granimInstance.changeState("default-state");
    }

    const fetchSearchResults = async () => {
      if (searchTerm.trim()) {
        const response = await fetch(
          `https://localhost:7024/GetCompanyByName/${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [searchTerm, granimInstance]);

  return (
    <div>
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
        <div className="search-results-container">
          {searchResults.map((result) => (
            <div key={result.companyId} className="search-result">
              {result.companyName}
            </div>
          ))}
        </div>
      </div>
      <canvas id="canvas-basic" style={{ zIndex: -1 }}></canvas>
    </div>
  );
}

export default Home;
