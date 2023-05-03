import { Link } from "react-router-dom";
import { React, useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BaseApiValueContext } from "../Context/BaseApiValueContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    // let email = null, username = null, password = null;
    // const client= useContext(BaseApiValueContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log([username, password]);
    axios.post('http://127.0.0.1:8000/dj-rest-auth/login/', {
      username: username,
      // email: email,
      password: password,
    })
      .then(response => {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
        console.log(localStorage.getItem('username'));
        navigate('/profile');
        // Redirect to home page or dashboard after successful login
      })
      .catch(error => {
        console.error(error);
      });
  };

    

    return (
      <div className="myForm">
          <h1 className="midLar"> LOGIN </h1>
          {/* <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div> */}
          <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
              <label>Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
          
          <div className="redirectLogReg"> 
              <Link className="noneDecor" to={"/register"}>Create an account?</Link>
          </div>
      </div>
    );
}
