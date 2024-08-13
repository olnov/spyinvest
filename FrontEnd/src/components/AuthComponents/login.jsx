import {useNavigate, useOutletContext} from 'react-router-dom';
import { useState } from 'react';
import {login} from '../../services/authServices';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {updateLoginStatus}  = useOutletContext();


    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const token = await login(email, password);
        localStorage.setItem('token', token);
        const userId = await getUserId(token);
        localStorage.setItem('userId', userId);
        updateLoginStatus();
        navigate('/portfolio');

        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type='email' name='email' value={email} onChange={handleChange} required/>
                <label>Password</label>
                <input type='password' name='password' value={password} onChange={handleChange} required/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )

}