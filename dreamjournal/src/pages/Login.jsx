import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email); // for fetching later
        navigate('/dashboard');
      } else {
        const msg = await response.text();
        alert(`Login failed: ${msg}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed due to network error.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Dream Journal</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>Register</span>
        </p>
      </div>
    </div>
  );
}
