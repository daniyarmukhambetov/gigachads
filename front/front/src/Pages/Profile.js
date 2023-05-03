import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Profile() {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const token = 'Bearer ' + localStorage.getItem('token');
  const headers = { Authorization: token };
 

  function deleteToken() {
    localStorage.clear();
    navigate('/login')
  }

  

  async function getUser() {
    setUsername(localStorage.getItem('username'));
    setEmail(localStorage.getItem('email'));
  }
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getUser();
    }
  });

  // useEffect(() => {
  //     getUser();
  //     console.log(user);
  //     console.log("debil");
  // }, [user])

  return (
    <div className="content">
      

    <p>username: {username}</p>
    <p>email: {email}</p>


    <button onClick={deleteToken}>Log out</button>
    </div>
    
  );
}
