import React, { useEffect, useState } from "react";
import TourBlock from "./TourBlock";
import TagFilter from "./Filter";

function Tours() {
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
    <div className="Tours">
      <div className="Tours-main">
        {showFilter && (
          <TagFilter
            tags={["Гімалаї", "Природа", "Гори"]}
            onFilter={handleFilter}
          />
        )}
        <div>
          {filteredTours.map((value) => (
            <TourBlock
              key={value._id}
              id={value._id}
              name={value.name}
              descr={value.description}
              duration={value.duration}
              country={value.country}
              img={value.img}
              price={value.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tours;
