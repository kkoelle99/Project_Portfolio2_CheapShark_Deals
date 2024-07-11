import React, { useState } from 'react';
import { Typography, TextField, Button, CircularProgress, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(8), // Add marginTop to push it below the header
}));

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '8px',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
});

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/login', { username, password });
      if (response.status === 200) {
        console.log('Logged in successfully');
        onLogin(username); // Pass the username to the onLogin callback
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <StyledForm>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {error && <Typography color="error">{error}</Typography>}
        <StyledButton onClick={handleLogin} variant="contained" color="primary" disabled={loading} fullWidth>
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </StyledButton>
      </StyledForm>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Don't have an account? <Link to="/register">Create one here</Link>
      </Typography>
    </StyledContainer>
  );
}

export default Login;
