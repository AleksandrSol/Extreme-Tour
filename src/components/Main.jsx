import React, { useEffect } from "react";
import TourBlock from "./TourBlock";

const Main = ({ tourData, setShowFilter }) => {
  useEffect(() => {
    setShowFilter(false);
    const path = window.location.pathname;
    const isTourPage = path.startsWith("/");
    setShowFilter(!isTourPage);
  }, [setShowFilter]);

  //алгоритм Фішера-Йетса.
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (!tourData || tourData.length === 0) {
    return <div>Завантаження</div>;
  }
  const shuffledTourData = shuffleArray(tourData);
  return (
    <div className="Main-page">
      <h1>Рекомендації:</h1>
      <TourBlock
        key={shuffledTourData[0]._id}
        id={shuffledTourData[0]._id}
        name={shuffledTourData[0].name}
        descr={shuffledTourData[0].description}
        duration={shuffledTourData[0].duration}
        country={shuffledTourData[0].country}
        img={shuffledTourData[0].img}
        price={shuffledTourData[0].price}
      />
      <div className="Other-recomendation">
        {shuffledTourData.slice(1, 4).map((value) => (
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
  );
};

export default Main;
