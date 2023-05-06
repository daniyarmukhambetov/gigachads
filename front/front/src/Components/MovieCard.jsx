import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { BaseApiValueContext } from "../Context/BaseApiValueContext";

const MovieCard = ({ movie }) => {
  const baseAPI = useContext(BaseApiValueContext);
  const baseURL = baseAPI.baseAPI;
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`./default-movie.jpg`}
          alt="img"
          className="movie-card-img"
        />
      </Link>
      <Link className="movie-card-title" to={`/movies/${movie.id} `}>
        {movie.title}
      </Link>
    </div>
  );
};

export default MovieCard;
