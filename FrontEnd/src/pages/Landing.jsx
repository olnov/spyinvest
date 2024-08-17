// This is the landing page of the website. On the left hand side, I will have a welcome message with 'license to invest' and a brief description of the website. 
//On the right hand side, I will have a login and registration form for the user to sign in or sign up.

import { useEffect } from 'react';

//Need to see how to use the below?
// import { Button, Container, Row, Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Login} from '../components/AuthComponents/Login';
import {Register} from '../components/AuthComponents/Register';
import {Logout} from '../components/AuthComponents/Logout';
import { TopBar } from '../components/TopBar/TopBar';
import "./Landing.css";

export const Landing = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    //Add background
    useEffect(() => {
        document.body.classList.add('page-background');

        return () => {
        document.body.classList.remove('page-background');
    };
    
  }, []);
    if (userId) {
        return (
            < Logout/>
        )
        // navigate('/portfolio');
    } else {
        return (
            <>
            <TopBar />
            <div className='landing-container'>
                <div className='landing-welcome-msg'>
                    <h1>Welcome to SpyInvest, where you have a license to invest!</h1>
                    <p>With SpyInvest, you can track all of your portfolios, with real time updates!</p>
                </div>
                <div className='landing-authform'>
                    <Login/>
                    <Register/>
                    </div>
            </div>
            </>
        );
    }
}


export default Landing;