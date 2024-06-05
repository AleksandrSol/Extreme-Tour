import React, { useEffect, useState } from "react";
import "./App.css";
import TourPage from "./components/TourPage";
import TourBlock from "./components/TourBlock";
import TagFilter from "./components/Filter";
import Tours from "./components/Tours";
import Header from "./components/Header";
import Foooter from "./components/Foooter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";

function App() {
  const [tours, setState] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    fetch("/api/tours")
      .then((response) => response.json())
      .then((data) => {
        setState(data);
        setFilteredTours(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const handlePopstate = () => {
      const path = window.location.pathname;
      const isTourPage = path.startsWith("/tour/");
      const isMainPage = path === "/";
      setShowFilter(!isMainPage);
      setShowFilter(!isTourPage);
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [setShowFilter]);

  const handleFilter = (selectedTags, priceRange, durationRange) => {
    const filtered = tours.filter((tour) => {
      const matchesTags = selectedTags.every((tag) => tour.tags.includes(tag));
      const matchesPrice =
        (!priceRange.min || tour.price >= priceRange.min) &&
        (!priceRange.max || tour.price <= priceRange.max);
      const tourDuration = parseInt(tour.duration.split(" ")[0], 10);
      const matchesDuration =
        (!durationRange.min || tourDuration >= durationRange.min) &&
        (!durationRange.max || tourDuration <= durationRange.max);
      return matchesTags && matchesPrice && matchesDuration;
    });
    setFilteredTours(filtered);
  };

  return (
    <Router>
      {showFilter && (
        <TagFilter
          tags={["Гімалаї", "Природа", "Гори"]}
          onFilter={handleFilter}
        />
      )}
      <div className="App">
        <header className="App-header">
          <Header showFilter={showFilter} setShowFilter={setShowFilter} />{" "}
        </header>
        <div className="App-main">
          <Routes>
            <Route
              path="/"
              element={<Main tourData={tours} setShowFilter={setShowFilter} />}
            />
            <Route path="/tours" element={<Tours />} />
            <Route
              path="/:id"
              element={<TourPage setShowFilter={setShowFilter} />}
            />
          </Routes>
        </div>
        <Foooter />
      </div>
    </Router>
  );
}

export default App;
