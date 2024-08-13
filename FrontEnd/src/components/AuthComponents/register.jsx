import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { register } from "../../services/authServices";

import Modal from 'react-modal';
// import password validator

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [photo, setPhoto] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();
    const {updateLoginStatus} = useOutletContext();

    const handleChange = (e) => {
        functions = [setEmail, setPassword, setConfirmPassword, setName, setSurname, setPhoto, setGender, setDob];
        targets = ['email', 'password', 'confirmPassword', 'name', 'surname', 'photo', 'gender', 'dob'];

        for (let i = 0; i < functions.length; i++) {
            if (e.target.name === targets[i]) {
                functions[i](e.target.value);
            }
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                const token = await register(email, password, name, surname, photo,gender, dob);
                localStorage.setItem('token', token);
                const userId = await getUserId(token);
                localStorage.setItem('userId', userId);
                updateLoginStatus();
                navigate('/portfolio');

            } else {
                alert('Passwords do not match');
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        
        <div className='register-container'>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>Email</label>
                <input type='email' name='email' value={email} onChange={handleChange} required/>
                <label>Password</label>
                <input type='password' name='password' value={password} onChange={handleChange} required/>
                <label>Confirm Password</label>
                <input type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} required/>
                <label>Name</label>
                <input type='text' name='name' value={name} onChange={handleChange} required/>
                <label>Surname</label>
                <input type='text' name='surname' value={surname} onChange={handleChange} required/>
                <label>Photo</label>
                <input type='text' name='photo' value={photo} onChange={handleChange} required/>
                </form>
                </div>
    )
}
