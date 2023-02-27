import React, { useState, useRef, useEffect } from 'react';
import '../App.css';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const resultsRef = useRef(null);

  const exampleResults = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "jackfruit",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "peach",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "watermelon"
  ];

  useEffect(() => {
    if (searchValue.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleResultClick = (result) => {


    const btn = document.querySelector('.btn'),
    input = document.querySelector('.input');

    btn.classList.toggle('close');
    input.classList.toggle('inclicked');
  };

  const resultsList = exampleResults.filter((result) => {
    return result.toLowerCase().includes(searchValue.toLowerCase());
  }).map((result) => {
    return (
      <li key={result} >
        {result}
      </li>
    );
  });

  return (
    <div className="search-container">
      <div className="middle">
        <input className="input" type="text" value={searchValue} onChange={handleSearchChange} />
        <button className="btn" onClick={handleResultClick}></button>
      </div>
      {showResults && (
        <div ref={resultsRef} className="search-results">
          <ul>{resultsList}</ul>
        </div>
      )}
      {selectedResult && <div className="selected-result">Selected Result: {selectedResult}</div>}
    </div>
  );
};

export default SearchBar;