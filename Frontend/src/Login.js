import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', data);
            const token = response.data.token;

            // Store token and username in localStorage
            localStorage.setItem('auth-token', token);
            localStorage.setItem('username', data.username);

            // Redirect to dashboard or home page
            navigate('/home');
        } catch (err) {
            setErrorMessage('Invalid login credentials');
        }
    };

    // Function to toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                marginTop: '150px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: 3,
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                align="center"
                sx={{
                    marginBottom: '20px',
                    color: 'black', // Set text color to white for better contrast
                    padding: '10px',
                    borderRadius: '4px',
                }}
            >
                Login
            </Typography>
            
            {/* Error message in Alert */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        id="username"
                        label="Username"
                        variant="outlined"
                        {...register('username', { required: 'Username is required' })}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                    />
                </Box>

                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        onClick={handleClickShowPassword}
                                        style={{ color: 'primary.main' }} // Use primary color for the icon
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: 'primary.main', // Use primary color for the button
                        '&:hover': { backgroundColor: 'primary.dark' }, // Darker shade on hover
                        color: 'white', // Set text color to white for better contrast
                        marginTop: '20px',
                    }}
                >
                    Login
                </Button>
            </form>

        </Container>
    );
};

export default Login;
