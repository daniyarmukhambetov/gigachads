import React, { useEffect, useState, useContext } from "react";
import MovieCard from "../Components/MovieCard";
import axios from "axios";
import { BaseApiValueContext } from "../Context/BaseApiValueContext";

export function Main() {
  const [popularMovies, setPopularMovies] = useState([]);
  const baseAPI = useContext(BaseApiValueContext);
  const baseURL = baseAPI.baseAPI;

  async function fetchData() {
    try {
      const response = await axios.get(
        `${baseURL}movies/movies/`
      );
      setPopularMovies(response.data.slice(0, 5));
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
        <div className="intro-text-title">Welcome!</div>
        <div className="intro-text-body">
          Millions of movies, and TV shows. Explore now.
        </div>
      </div>
      <h3 className="">Popular</h3>
      <div className="popular-movies">
        {popularMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
