import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {userFunc}=useContext(ProductContext)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists and password matches
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
      alert('Login successful!');
      userFunc(username)
      navigate('/home'); // Redirect to home or dashboard
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
