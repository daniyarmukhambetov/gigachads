import { Link } from "react-router-dom";
import { React, useContext, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BaseApiValueContext } from "../Context/BaseApiValueContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopupWarning } from "../Components/PopupWarning";

export function LoginPage() {
    // let email = null, username = null, password = null;

  const navigate = useNavigate();
  const baseURL = useContext(BaseApiValueContext).baseAPI;
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkBox, setCheckox] = useState(false);

  const [showWarning, setShowWarning] = useState(false);
  const [message, setMessage] = useState(messageBox());

  const handleShowWarning = () => {
    setShowWarning(true);
  }

  const handleCloseWarning = () => {
    setShowWarning(false);
  }

  function messageBox() {
    let mes = [];
    if (username.length === 0) {
      mes.push("username");
    } else {
      mes = mes.filter(item => item !== "username");
    }
    if (password.length === 0) {
      mes.push("password");
    } else {
      mes = mes.filter(item => item !== "password");
    }
    if (!checkBox) {
      mes.push("checkbox");
    } else {
      mes = mes.filter(item => item !== "checkbox");
    }
    return mes;
  }



  function handleLogin() {
    if (message.length === 0) {
      axios.post(`${baseURL}dj-rest-auth/login/`, {
        username: username,
        // email: email,
        password: password,
      })
        .then(response => {
          const token = response.data.access_token;
          const refresh_token = response.data.refresh_token;
          localStorage.setItem('token', token);
          localStorage.setItem('refresh_token', refresh_token);
          // localStorage.setItem('username', response.data.user.username);
          // localStorage.setItem('email', response.data.user.email);
          navigate('/profile'); // Redirect to home page or dashboard after successful login
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      handleShowWarning();
    }
  };


  useEffect(() => {
    setMessage(messageBox());
  }, [username, password, checkBox]);
    

    return (
      <div className="myForm">
          <h1 className="midLar"> LOGIN </h1>
          {/* <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div> */}
          <div className="form-group">
              <label>Username </label>
              <div>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
          </div>
          <div className="form-group">
              <label>Password</label>
              <div>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
          </div>
          <div className="form-group">
              <input type="checkbox" className="form-check-input" onChange={e => setCheckox(e.target.checked)}></input>
              <label>Check me out</label>
          </div>
          
          {showWarning && <PopupWarning message={message} onClose={handleCloseWarning} />}

          <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
          
          <div className="redirectLogReg"> 
              <Link className="noneDecor" to={"/register"}>Create an account?</Link>
          </div>
      </div>
    );
}
