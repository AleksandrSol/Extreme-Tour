import React from 'react';
import { Link } from 'react-router-dom';

const TourBlock = (props) => {
    return (
        <Link to={{ pathname: `/${props.id}`}}>
            <div className="App-content">
                <img src={props.img} alt="Картинка тура" />
                <div className="App-content-tour-info">
                    <p>{props.name}</p>
                    <p>Країна: {props.country}</p>
                    <p>Тривалість: {props.duration}</p>
                    <p>Ціна: {props.price}$</p>
                </div>
            </div>
        </Link>
    );
};

export default TourBlock;