import { useState } from 'react';
import { supabase } from './supabaseClient';
import './Auth.css';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!userId || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('user_id', userId)
      .eq('password', password)
      .single();

    if (error || !data) {
      setMessage('❌ Invalid credentials');
    } else {
      setMessage(`✅ Welcome, ${data.name}`);
    }
  };

  return (
    <>
      {/* Background ripple (reused from Signup) */}
      <div className="ripple-background">
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
        <div className="ripple-circle"></div>
      </div>

      <div className="auth-container">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtext">Log in to continue your journey with us.</p>

        <input
          placeholder="User ID"
          onChange={e => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleLogin}>
          Log In →
        </button>

        <p className="message">{message}</p>
      </div>
    </>
  );
}
