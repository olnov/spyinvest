import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './pages/Landing'
import WholeViewOfAssets from './pages/WholeViewOfAssets'
import MyPortfolio from './pages/MyPortfolio';

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
    path: "/portfolios",
    element: <MyPortfolio />,
  }
])
function App() {


  return (

    <>

      <RouterProvider router={router} />
      <WholeViewOfAssets />

    </>
  )
}

export default App
