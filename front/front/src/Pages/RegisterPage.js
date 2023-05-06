import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { BaseApiValueContext } from "../Context/BaseApiValueContext";
import axios from "axios";
import {React, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { PopupWarning } from "../Components/PopupWarning";

export function RegisterPage() {
    // let email = null, username = null, password = null;
    // const client= useContext(BaseApiValueContext);

    const navigate = useNavigate();
    const baseURL = useContext(BaseApiValueContext).baseAPI;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
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
      if (password1.length === 0) {
        mes.push("password1");
      } else {
        mes = mes.filter(item => item !== "password1");
      }
      if (password2.length === 0) {
        mes.push("password2");
      } else {
        mes = mes.filter(item => item !== "password2");
      }
      if (!checkBox) {
        mes.push("checkbox");
      } else {
        mes = mes.filter(item => item !== "checkbox");
      }
      return mes;
    }

    const handleRegister = () => {
      if (message.length === 0) {
        axios.post(`${baseURL}dj-rest-auth/registration/`, {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
        })
        .then(response => {
            const token = response.data.access_token;
            const refresh_token = response.data.refresh_token
            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', refresh_token)
            // localStorage.setItem('username', response.data.user.username);
            // localStorage.setItem('email', response.data.user.email);
            navigate('/profile');
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
    }, [email, username, password1, password2, checkBox]);

    return (
        <div className="myForm">
            <h1 className="midLar"> REGISTRATION </h1>
            <div className="form-group">
                <div className="label">Email address</div>
              <div>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
                <div className="label">Username</div>
              <div>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
                <div className="label">Password</div>
              <div>
                <input type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)} />
              </div>
                
            </div>
            <div className="form-group">
                <div className="label">Confirm Password</div>
              <div>
                <input type="password" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} />
              </div>
                
            </div>
            <div className="form-group">
              <input type="checkbox" className="form-check-input" onChange={e => setCheckox(e.target.checked)}></input>
                <label>Check me out</label>
            </div>

            {showWarning && <PopupWarning message={message} onClose={handleCloseWarning} />}

            <button type="submit" className="btn btn-primary" onClick={handleRegister}>Submit</button>
            
            <div className="redirectLogReg"> 
                <Link className="noneDecor" to={"/login"}>Already have an account?</Link>
            </div>
        </div>
    );
}
