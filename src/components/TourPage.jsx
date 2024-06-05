import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TourBlock from "./TourBlock";
const TourPage = ({ setShowFilter }) => {
  const { id } = useParams();
  const [tourData, setTourData] = useState([]);
  const [allToursData, setAllToursData] = useState([]);
  const [recentlyViewedTours, setRecentlyViewedTours] = useState([]);

  useEffect(() => {
    fetch("/api/tours/")
      .then((res) => res.json())
      .then((data) => {
        setAllToursData(data);
        setTourData(data.find((tour) => tour._id === id));
        setShowFilter(false);
      });

    const recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewedTours")) || [];
    setRecentlyViewedTours(recentlyViewed);

    const updatedRecentlyViewed = [
      id,
      ...recentlyViewed.filter((tourId) => tourId !== id),
    ].slice(0, 4);
    setRecentlyViewedTours(updatedRecentlyViewed);

    localStorage.setItem(
      "recentlyViewedTours",
      JSON.stringify(updatedRecentlyViewed)
    );

    const path = window.location.pathname;
    const isTourPage = path.startsWith("/tour/");
    setShowFilter(!isTourPage);
  }, [id, setShowFilter]);

  return (
    <div className="Tour-page-content">
      <div className="Tour-page">
        <img src={tourData.img} alt="Картинка тура" />
        <div className="App-content-tour-info">
          <p>Назва: {tourData.name}</p>
          <p>Ціна: {tourData.price}$</p>
          <p>Країна: {tourData.country}</p>
          <p>Тривалість: {tourData.duration}</p>
          <p>Про тур: {tourData.description}</p>
        </div>
      </div>
      <h3>Останні переглянуті тури</h3>
      <div className="Other-recomendation">
        {allToursData
          .filter(
            (tour) =>
              recentlyViewedTours.includes(tour._id) &&
              tour._id !== tourData._id
          )
          .map((tour, index) => (
            <div key={index}>
              <TourBlock
                key={tour._id}
                id={tour._id}
                name={tour.name}
                descr={tour.description}
                duration={tour.duration}
                country={tour.country}
                img={tour.img}
                price={tour.price}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default TourPage;
