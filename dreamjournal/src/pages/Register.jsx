import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Replace with actual API call
    if (username && email && password) {
      navigate('/login');
    }
  };

  return (
    <div className="register-screen-bg">
      <div className="register-glass-box">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleRegister} className="register-form-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input-field"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input-field"
            required
          />
          <button type="submit" className="register-submit-button">Sign Up</button>
        </form>
        <p className="register-nav-text">
          Already have an account? <span onClick={() => navigate('/login')} className="register-nav-link">Login</span>
        </p>
      </div>
    </div>
  );
}
