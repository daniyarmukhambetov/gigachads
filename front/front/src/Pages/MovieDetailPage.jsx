import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseApiValueContext } from "../Context/BaseApiValueContext";



function MovieDetailPage() {
  const token = 'Bearer ' + localStorage.getItem('token');
  const headers = { Authorization: token };

  const baseAPI = useContext(BaseApiValueContext);
  const baseURL = baseAPI.baseAPI;

  
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState();

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
        `${baseURL}movies/movies/${id}/`
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
      url = `${baseURL}cinema/by_cinema/`;
    } else if (sorted == 'time') {
      url = `${baseURL}cinema/by_time/`;
    }

      const response = await axios.get(
        url, {
          params: {
            date: date,
            movie_id: id,
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
    let myBook = [];
    for (let i = 0; i < seats.length; i++) {
      seat.push(parseInt((seats[i].seat_number)));
      if (seats[i].is_users_ticket === true) {
        myBook.push(parseInt(seats[i].seat_number));
      }
    }
    setMyBooked(myBook);
    return seat;
  }

  const [currentEvent, setCurrentEvent] = useState();

  async function openModal(event) {
    setIsOpen(true);
    setCurrentEvent(event);
    const response = await axios.get(`${baseURL}tickets/tickets/`, {
      params: {
        event__id: event.id,
      }, 
      headers,
      }
      )
      .then(response => {
        setExcludedNumbers(excludedSeats(response.data));
    })
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
    const response = await axios.post(`${baseURL}tickets/tickets/`, parseSelected(selected), {
      params: {
        event: currentEvent.id,
      },
      headers,
    })
    .then()
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
  const [myBooked, setMyBooked] = useState([]);

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

  return (
    <div className="content">
      
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading...</h2>}
      {movie && (
        <div className="movie-detail-card">
          <div className="movie-detail-card-img">
            <img
              src={`../default-movie.jpg`}
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
                {movie.country}
              </div>
            </div>
            <div className="row">
              <div className="row-title">Genres</div>
              <div className="row-value">
                {movie.category.map((g, index) => (
                  <p to={`category/${g.id}`} key={g.id}>
                    {g.name} {index < movie.category.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="row-title">Time</div>
              <div className="row-value">{movie.duration} min</div>
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
              <div className="row-value">{movie.rating} out of 10</div>
            </div>
            <div className="row">
              <div className="row-title">Description:</div>
              <div className="row-value">{movie.description}</div>
            </div>
          </div>
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
                          backgroundColor: selected.includes(col) ? 'green' : myBooked.includes(col) ? 'blue' : excludedNumbers.includes(col) ? 'red' : 'white',
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
