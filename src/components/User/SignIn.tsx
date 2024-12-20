import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axios from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('users/login', { email, password });
      console.log(response.data);
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  const navigateSignin =()=>{
    navigate(`/signup`);
  }

  const navigateproject =()=>{
    navigate(`/project`);
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" onClick={navigateproject} sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Typography sx={{ml:2,fontSize:22}}>You don't have an accout?
          <Button type="submit"  variant="outlined" onClick={navigateSignin} sx={{  ml:1,mb: 0}}>
            Sign Up
          </Button>
          </Typography>
          
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
