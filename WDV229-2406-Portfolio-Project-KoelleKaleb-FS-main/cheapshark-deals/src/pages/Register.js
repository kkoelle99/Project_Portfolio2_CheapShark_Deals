import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/register`, { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Response Data:', error.response.data);
            }
            setErrorMessage('Error registering user');
        }
    };
    

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleRegister} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                        Register
                    </Button>
                    {errorMessage && (
                        <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                            {errorMessage}
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Register;