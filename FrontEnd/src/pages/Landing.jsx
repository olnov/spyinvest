// This is the landing page of the website. On the left hand side, I will have a welcome message with 'license to invest' and a brief description of the website.
//On the right hand side, I will have a login and registration form for the user to sign in or sign up.

import MyPortfolio from "./MyPortfolio";
import Login from "./Login/Login";

export const Landing = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <MyPortfolio />;
  } else {
    return <Login />;
  }
};

export default Landing;
