import { Link } from "react-router-dom";
import { useState } from 'react';
import { BaseApiValueContext } from "../Context/BaseApiValueContext";
import axios from "axios";
import {React, useContext} from 'react';
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
    // let email = null, username = null, password = null;
    // const client= useContext(BaseApiValueContext);

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleRegister = () => {
        axios.post('http://localhost:8000/dj-rest-auth/registration/', {
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
            navigate('/profile');
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="myForm">
            <h1 className="midLar"> REGISTRATION </h1>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} />
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                <label>Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleRegister}>Submit</button>
            
            <div className="redirectLogReg"> 
                <Link className="noneDecor" to={"/login"}>Already have an account?</Link>
            </div>
        </div>
    );
}
