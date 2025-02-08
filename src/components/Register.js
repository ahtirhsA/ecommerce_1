import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Importing the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage (if any)
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const userExists = existingUsers.some(user => user.username === username);
    if (userExists) {
      alert('Username already exists! Please choose another.');
      return;
    }

    // Create new user object
    const newUser = { username, password };

    // Add new user to the array and save it back to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
