import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../services/authServices';
import {getUserInfo} from '../../services/userServices';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const { updateLoginStatus } = useOutletContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            // updateLoginStatus();
            navigate('/portfolios');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin} data-testid="login-form">
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    autoComplete='true'
                    value={email}
                    onChange={handleChange}
                    required
                    data-testid="email-input"
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    autoComplete='true'
                    value={password}
                    onChange={handleChange}
                    required
                    data-testid="password-input"
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};
