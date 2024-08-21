import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './pages/Landing'
import WholeViewOfAssets from './pages/WholeViewOfAssets'
import MyPortfolio from './pages/MyPortfolio';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
  path: "/",
  children: [
    {
      path: "/",
      element: <Landing />,
    },]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: "/portfolios",
    element: <MyPortfolio />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  }
])
function App() {


  return (

    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App
