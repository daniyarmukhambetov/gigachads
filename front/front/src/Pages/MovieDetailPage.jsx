import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function MovieDetailPage() {
  const token = 'Bearer ' + localStorage.getItem('token');
  const headers = { Authorization: token };
  

  const [isOpen, setIsOpen] = useState(false);

  const moviesApi = "https://api.themoviedb.org/3/movie";
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState(null);

  const [sorted, setSorted] = useState('cinema');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const handleDateChange = (event) => {
    setDate(event.target.value);
    closeModal();
  }

  const [events, setEvents] = useState([]);  

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

  let url = null;

  useEffect(() => {
    fetchEventData();
    closeModal();
  }, [sorted]);

  useEffect(() => {
    fetchEventData();
  }, [date]);

  async function fetchEventData() {
    if (sorted == 'cinema') {
      url = 'http://127.0.0.1:8000/cinema/by_cinema/';
    } else if (sorted == 'time') {
      url = 'http://127.0.0.1:8000/cinema/by_time/'
    }

      const response = await axios.get(
        url, {
          params: {
            date: date,
            movie_id: 1
          },
        }
      )
      .then((response) => {
        setEvents(response.data);
        // setEvents(response.events);
      })
      .catch((error) => {
        console.log(error);
      });
    }



  function excludedSeats(seats) {
    let seat = [];
    for (let i = 0; i < seats.length; i++) {
      seat.push(parseInt((seats[i].seat_number)));
    }
    return seat;
  }

  const [currentEvent, setCurrentEvent] = useState();

  async function openModal(event) {
    setIsOpen(true);
    setCurrentEvent(event);
    const response = await axios.get('http://127.0.0.1:8000/tickets/tickets/', {
      params: {
        event__id: event.id,
      }
      }
      )
      .then(response => setExcludedNumbers(excludedSeats(response.data)))
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModal() {
    setIsOpen(false);
    setSelected([]);
  }

  function parseSelected(items) {
    const list = [];
    for (let i = 0; i < items.length; i++) {
      list.push({"seat_number": items[i]});
    }
    return list;
  }


  async function bookTickets() {
    const response = await axios.post('http://127.0.0.1:8000/tickets/tickets/', parseSelected(selected), {
      params: {
        event: currentEvent.id,
      },
      headers,
    })
    .then(response => (console.log(response.data)))
    .catch((error) => {
      console.log(error);
    });
    setSelected('');
    openModal(currentEvent);
  }

  const [matrix, setMatrix] = useState(
    Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => 10 * row + col + 1)
    )
  );


  const [excludedNumbers, setExcludedNumbers] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleSelect = (num) => {
    const index = selected.indexOf(num);
    if (selected.includes(num) || excludedNumbers.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else {
      setSelected([...selected, num]);
    }
  };

  
  const showEvent = events.map((item, id) => (
    <tr key={id}>
      <td>{new Date(item.start_time).toLocaleString()}</td>
      <td>{item.cinema}</td>
      <td>RU</td>
      <td>{item.adult_price}</td>
      <td>{item.student_price}</td>
      <td>{item.child_price}</td>
      <td><button onClick={() => openModal(item)}>Купить</button></td>
    </tr>
  ));



  useEffect(() => {
    fetchData().then();
    
    fetchEventData();
  }, []);

  // useEffect(() => {
  //   axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`;
  // }, [localStorage.getItem('token')]);
  // useEffect(() => {
  //   fetchData().then();
  //   fetchEventData();
    
  //   // fetchMovieData();
  // });

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
      <div className="classSort">
        <span><button className="buttonSort" onClick={() => setSorted('time')}>sort by time</button></span>
        <span><button className="buttonSort" onClick={() => setSorted('cinema')}>sort by cinema</button></span>
      </div>
      <div>
        <input type="date" value={date} onChange={handleDateChange} />
      </div>
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
        {showEvent}
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
