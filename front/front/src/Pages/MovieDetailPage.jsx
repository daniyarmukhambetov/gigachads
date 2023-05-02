import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function MovieDetailPage() {
  const token = 'Bearer ' + localStorage.getItem('token');
  const headers = { Authorization: token };

  const [isOpen, setIsOpen] = useState(true);

  const moviesApi = "https://api.themoviedb.org/3/movie";
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState(null);


  // const [data, setData] = useState([]);  

  const { id } = useParams();

  async function fetchData() {
    try {
      const response = await axios.get(
        `${moviesApi}/${id}?api_key=498f0c94da7ca8672cee0f261723823a`
      );
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  }


  const data = [
    {
      "id": 1,
      "startTime": "10:00",
      "cinema": "Арман",
      "language": "рус",
      "adultPrice": 2000,
      "studentPrice": 1500,
      "childPrice": 1000
    },
    {
      "id": 2,
      "startTime": "10:00",
      "cinema": "Арман",
      "language": "рус",
      "adultPrice": 2000,
      "studentPrice": 1500,
      "childPrice": 1000
    },
    {
      "id": 3,
      "startTime": "10:00",
      "cinema": "Арман",
      "language": "рус",
      "adultPrice": 2000,
      "studentPrice": 1500,
      "childPrice": 1000
    }
  ]
  

  // const fetchMovieData = () => {
  //   axios.get('http://localhost:8000/dj-rest-auth/user/', { headers })
  //     .then(response => setData(response.data))
  //     .catch(error => console.error(error));
  // };


  function openModal(props) {
    setIsOpen(true);
    // fillMatrix();
    // axios.get('', { headers })
    // .then(response => setData(response.data));

  }

  function closeModal() {
    setIsOpen(false);
    setSelected([]);
  }

  function bookTickets() {}

  const [matrix, setMatrix] = useState(
    Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => 10 * row + col + 1)
    )
  );


  const [excludedNumbers, setExcludedNumbers] = useState([5, 7, 9]);
  const [selected, setSelected] = useState([]);

  const handleSelect = (num) => {
    const index = selected.indexOf(num);
    if (selected.includes(num) || excludedNumbers.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else {
      setSelected([...selected, num]);
    }
  };

  
  const tik = data.map((item, id) => (
    <tr key={id}>
      <td>{item.startTime}</td>
      <td>{item.cinema}</td>
      <td>{item.language}</td>
      <td>{item.adultPrice}</td>
      <td>{item.studentPrice}</td>
      <td>{item.childPrice}</td>
      <td><button onClick={() => openModal(item)}>Купить</button></td>
    </tr>
  ));


  useEffect(() => {
    fetchData().then();
    
    // fetchMovieData();
  });

  return (
    <div className="content">
      
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading...</h2>}
      {movie && (
        <div className="movie-detail-card">
          <div className="movie-detail-card-img">
            <img
              src={`${
                movie.poster_path !== null
                  ? `${imagePath}/${movie.poster_path}`
                  : "../default-movie.jpg"
              }`}
              alt="Logo"
            />
          </div>
          <div className="movie-detail-body">
            <div className="row">
              <div className="row-title">Title</div>
              <div className="row-value">{movie.title}</div>
            </div>
            <div className="row">
              <div className="row-title">Release Date</div>
              <div className="row-value">{movie.release_date}</div>
            </div>
            <div className="row">
              <div className="row-title">Country</div>
              <div className="row-value">
                {movie.production_countries.map((c) => (
                  <p key={c.name}>{c.name}</p>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="row-title">Genres</div>
              <div className="row-value">
                {movie.genres.map((g, index) => (
                  <p to={`/genre/${g.id}`} key={g.id}>
                    {g.name} {index < movie.genres.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="row-title">Time</div>
              <div className="row-value">{movie.runtime} min</div>
            </div>
            <div className="row">
              <div className="row-title">Revenue</div>
              <div className="row-value">{movie.revenue}$ USD</div>
            </div>
            <div className="row">
              <div className="row-title">Tagline</div>
              <div className="row-value">{movie.tagline}</div>
            </div>
            {/*<div className="row">*/}
            {/*  <div className="row-title">Overview</div>*/}
            {/*  <div className="row-value">{movie.overview}</div>*/}
            {/*</div>*/}
            <div className="row">
              <div className="row-title">Status</div>
              <div className="row-value">{movie.status}</div>
            </div>
            <div className="row">
              <div className="row-title">Rating</div>
              <div className="row-value">{movie.vote_average} out of 10</div>
            </div>
          </div>
          <div className="movie-detail-overview">"{movie.overview}"</div>
        </div>
      )}

    <table>
      <thead>
        <tr>
          <th>Время</th>
          <th>Кинотеатр</th>
          <th>Язык</th>
          <th>Взрослый</th>
          <th>Студенческий</th>
          <th>Детский</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {tik}
      </tbody>
    </table>

    {isOpen &&
        <div>
          <div>
            <div className="close"><button onClick={closeModal}>Close</button></div>
            
            <div>
            <table>
              <tbody>
                {matrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        onClick={() => handleSelect(col)}
                        style={{
                          border: '1px solid black',
                          width: '50px',
                          height: '30px',
                          backgroundColor: selected.includes(col) ? 'green' : excludedNumbers.includes(col) ? 'red' : 'white',
                          cursor: excludedNumbers.includes(col) ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            <div className="close"><button onClick={bookTickets}>Book</button></div>

          </div>
        </div>
      }

    </div>
  );
  
}

export default MovieDetailPage;
