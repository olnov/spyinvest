import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register , login} from "../../services/authServices";


export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    
    const navigate = useNavigate();
    // const {updateLoginStatus} = useOutletContext();

    const handleChange = (e) => {
        const functions = [setEmail, setPassword, setConfirmPassword, setName, setSurname];
        const targets = ['email', 'password', 'confirmPassword', 'name', 'surname'];

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
                const user = await register(email, password, name, surname);
                const data = await login(email, password)
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                // updateLoginStatus()
                navigate('/onboarding');

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
                <input type='password' name='password' autoComplete="true" value={password} onChange={handleChange} required/>
                <label>Confirm Password</label>
                <input type='password' name='confirmPassword' autoComplete="true"value={confirmPassword} onChange={handleChange} required/>
                <label>Name</label>
                <input type='text' name='name' value={name} onChange={handleChange} required/>
                <label>Surname</label>
                <input type='text' name='surname' value={surname} onChange={handleChange} required/>
                <button type='submit'>Register</button>
                </form>
                </div>
    )
}
