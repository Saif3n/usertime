import React, { useState, useRef, useEffect } from 'react';
import '../App.css';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.style.height = `${resultsRef.current.scrollHeight}px`;
    } else if (!showResults && resultsRef.current) {
      resultsRef.current.style.height = '0';
      setSelectedResult(null);
    }
  }, [showResults]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setShowResults(event.target.value.length > 0);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setSearchValue(result);
    setShowResults(false);
  };

  return (
    <div class="searchBox">
      <input class="searchInput" type="text" name="" placeholder="Search"/>
        <button class="searchButton" href="#">
          <i class="material-icons">
            search
          </i>
        </button>
    </div>

  );
};

export default SearchBar;
