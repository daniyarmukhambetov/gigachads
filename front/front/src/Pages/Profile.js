import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Profile() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }})

  return (
    <div className="content">Profile page</div>
  );
}
