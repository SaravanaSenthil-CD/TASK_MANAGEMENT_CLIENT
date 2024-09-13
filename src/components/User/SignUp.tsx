import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axios from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/signup', { username, password, email });
      console.log(response.data);
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };

  const navigateSignup =()=>{
    navigate(`/`);
  }

  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" onClick={navigateSignup} sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Typography sx={{ml:2,fontSize:22}}>You don't have an accout?
          <Button type="submit"  variant="outlined" onClick={navigateSignup} sx={{  ml:1,mb: 0}}>
            Sign In
          </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
