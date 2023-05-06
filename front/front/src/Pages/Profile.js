import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseApiValueContext } from '../Context/BaseApiValueContext';

export function Profile() {
  const baseURL = useContext(BaseApiValueContext).baseAPI;
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [pk, setPK] = useState();
  const [myTickets, setMyTickets] = useState([]);

  const navigate = useNavigate();

  const token = 'Bearer ' + localStorage.getItem('token');
  const headers = { Authorization: token };
 

  function deleteToken() {
    localStorage.clear();
    navigate('/login')
  }

  async function getUser() {
    const response = await axios.get(`${baseURL}dj-rest-auth/user/`, {
      headers,
    })
    .then((response) => {
      setEmail(response.data.email);
      setUsername(response.data.username);
      setPK(response.data.pk);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getUser();
      getUserTickets();
    }
  });

  async function getUserTickets() {
    const response = await axios.post(`${baseURL}tickets/tickets/`, {
      params: {
        id: pk,
      },
      headers,
    })
    .then(response => {
      console.log(response.data);
      setMyTickets(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function deleteTicket(ticketID) {
    const response = axios.delete(`${baseURL}tickets/tickets/${ticketID}/`, {
      params: {
        id: ticketID,
      },
      headers,
    })
    .then(response => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const showTickets = myTickets.map((item, id) => (
    <li key={id}>
      aasd
      <button onClick={() => (deleteTicket(item.id))}>remove</button>
    </li>
  ));


  return (
    <div className="content profile">
      <h2 id="AboutUsTitle">Profile</h2>

      <div>
        <ul>
          <li>
            {username}
          </li>
          <li>
            {email}
          </li>
          <li>Your tickets:
            { showTickets }
          </li>
        </ul>
      </div>
      <button className='logout' onClick={deleteToken}>Log out</button>
    </div>
  );
}
