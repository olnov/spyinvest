import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './pages/Landing'
import { Test } from "./pages/Test";
import { SignUp } from "./pages/SingnUp/SignUp";
import { Login } from "./pages/Login/Login";
import Portfolio from './pages/Portfolio/Portfolio';

const router = createBrowserRouter([
  {
  path: "/",
  children: [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/test",
      element: <Test />,
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
      path: '/portfolio',
      element: <Portfolio />,
    }
  ]
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
