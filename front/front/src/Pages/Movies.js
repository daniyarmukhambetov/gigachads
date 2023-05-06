import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import { BaseApiValueContext } from "../Context/BaseApiValueContext";


export function Movies() {
  const [Movies, setMovies] = useState([]);
  const baseAPI = useContext(BaseApiValueContext);
  const baseURL = baseAPI.baseAPI;

  async function fetchData() {
    try {
      const response = await axios.get(
        `${baseURL}movies/movies/`
      );
      setMovies(response.data);
      // console.log(response.data.results)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="content">
      <div className="intro-text">
        <div className="intro-text-title">All Movies!</div>
        <div className="intro-text-body">
          Millions of movies, and TV shows. Explore now.
        </div>
      </div>
      <h3 className="">Movies</h3>
      <div className="popular-movies">
        {Movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
