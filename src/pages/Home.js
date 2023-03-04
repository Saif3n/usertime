import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Granim from "granim";
import WaitTime from "../components/WaitTime";

function Home() {


  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [granimInstance, setGranimInstance] = useState(null);
  const [companySearch, setCompanySearch] = useState(null);
  const [companyTime, setCompanyTime] = useState(null);
  const [timerId, setTimerId] = useState(null);

  const [companyIndustry, setCompanyIndustry] = useState(null);

  const resultTime = useRef();

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
              ["#0A080D", "#40263D"],
              ["#570F32", "#530C2E"],
              ["#3B2F4C", "#141729"],
            ],
          },
        },

      });
      setGranimInstance(instance);
    } else {
      granimInstance.changeState("default-state");
    }

  }, [granimInstance]);


  const fetchSearchResults = async (searchTerm) => {
    
    if (searchTerm.trim()) {
      const response = await fetch(
        //personalbackendreact.azurewebsites.net
        `https://personalbackendreact.azurewebsites.net/GetCompanyByName/${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setCompanySearch(null);

    setSearchTerm(searchTerm);
    if (timerId) {
      clearTimeout(timerId);
    }
    if (searchTerm.trim()) {
      const id = setTimeout(() => {
        fetchSearchResults(searchTerm);
      }, 500);
      setTimerId(id);
    } else {
      setSearchResults([]);
    }
  };

  const handleCompanyClick = (company, industry) => {

    setCompanySearch(company)
    setCompanyTime(company)
    setCompanyIndustry(industry)

    setSearchResults([])
    setSearchTerm('');
  }

  return (
    <div>
      <div className="title">
        <h1 className="header">Call Centre Wait Times</h1>
        <h2 className="detail">Wanting to know how long it'll take to get through to a company via phone? Type the desired company in the search box below.</h2>
      </div>
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
            className="search-bar"
          />
        </div>
        <div className="search-results-container">
          {searchResults.map((result) => (
            <div key={result.companyId} onClick={() => handleCompanyClick(result.companyName, result.companyIndustry)} className="search-result">
              <li className="li-result">{result.companyName}</li>
              <li className="li-result">{result.companyIndustry}</li>
            </div>
          ))}
          {searchTerm && <div className="search-result">
            <li id="add">Don't see what you're looking for? <br></br>Click <Link to="/AddCompany">here</Link> to add a company</li>
          </div>}
        </div>
        {companySearch && <WaitTime companyName={companyTime} companyIndustry={companyIndustry} ref={resultTime} />}
      </div>


      <canvas id="canvas-basic" style={{ zIndex: -1 }}></canvas>
    </div>
  );
}

export default Home;