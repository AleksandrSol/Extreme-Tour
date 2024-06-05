import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ showFilter, setShowFilter }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    if (text.trim() === "") {
      setSearchResults([]);
    } else {
      fetchTours(text);
    }
  };

  const fetchTours = async (text) => {
    try {
      const response = await fetch(`api/search?text=${text}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Ошибка при выполнении запроса поиска:", error);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <header>
      <nav>
        <ul className="nav-menu">
          <li>
            <Link
              to="/"
              onClick={() => {
                setShowFilter(false);
                handleClearSearch();
              }}
              className={location.pathname === "/" ? "active" : ""}
            >
              Головна
            </Link>
          </li>

          <li>
            <Link
              to="/tours"
              onClick={handleClearSearch}
              className={location.pathname === "/tours" ? "active" : ""}
            >
              Тури
            </Link>
          </li>
          <li className="search">
            <input
              type="text"
              placeholder="Пошук"
              value={searchText}
              onChange={handleSearchChange}
            />
            {searchText.trim() !== "" && searchResults.length > 0 && (
              <div className="search-results">
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleClearSearch}
                        to={{ pathname: `/${result._id}` }}
                      >
                        {result.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div></div>
    </header>
  );
};

export default Header;
