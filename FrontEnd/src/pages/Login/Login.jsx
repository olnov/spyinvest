import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login} from "../../services/authServices";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error,setError] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            // updateLoginStatus();
            navigate('/portfolio');
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    //Add background
    useEffect(() => {
        document.body.classList.add('page-background');
        return () => {
            document.body.classList.remove('page-background');
        };
    },[]);

    return (
        <>
        
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ackgroundColor: 'hsl(0, 0%, 96%)'}}>
            <div className="container">
            <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight text-white">
                Welcome to SpyInvest, <br />
                    <span>where you have a license to invest!</span>
                </h1>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card" style={{ opacity: '.95'}}>
                    <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleLogin}>
                        <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="email" name="email" className="form-control" onChange={handleChange} />
                        <label className="form-label" htmlFor="email">Email address</label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="password" name="password" className="form-control" onChange={handleChange} />
                        <label className="form-label" htmlFor="password">Password</label>
                        </div>
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        Login
                        </button>
                    </form>
                    <a href="/signup"><h6>Don't have a login? Please, register.</h6></a>
                    { error ? (
                        <p><h6 className="text-danger">Your email or password is incorrect</h6></p>
                    ): (
                        <p></p>
                    )}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        </>
    )
}

export default Login;