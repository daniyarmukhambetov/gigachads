import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import { BaseApiValueContext } from "../Context/BaseApiValueContext";

export function Premieres() {
  const { movieApi } = React.useContext(BaseApiValueContext);
  const [announced, setAnnounced] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseAPI = useContext(BaseApiValueContext);
  const baseURL = baseAPI.baseAPI;

  async function fetchData() {
    try {
      const response = await axios.get(
        `${baseURL}movies/movies/`
      , {
        params: {
          status__name: "Released",
        }
      });
      setAnnounced(response.data);
      setLoading(false);
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
      <div className="content-wrapper">
        <h3>Now Playing</h3>
        {loading && <h2>Loading...</h2>}
        {announced && (
          <div className="popular-movies">
            {announced.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
