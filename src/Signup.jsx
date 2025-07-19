import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './Auth.css'; 

export default function Signup() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For programmatic navigation

  const handleSignup = async () => {
    if (!name || !userId || !password) {
      setMessage('Please fill in all the fields.');
      return;
    }

    const { data, error } = await supabase
      .from('Users')
      .insert([{ name, user_id: userId, password }]);

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage('Signup successful!');
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="shine-border">
      <div className="ripple-background">
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
      </div>

      <div className="auth-container">
        <h2 className="auth-title">
          Join <span className="highlight-orange">Nuvana</span>
        </h2>
        <p className="auth-subtext">
          Create your account to become part of a supportive community.
        </p>
        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="User ID" onChange={e => setUserId(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="primary-btn" onClick={handleSignup}>
          Join Our Community →
        </button>
        <p className="message">{message}</p>
        <p className="switch-link">
          Already have an account? <Link to="/login" className="message">Log in here</Link>
        </p>
      </div>
    </div>
  );
}
