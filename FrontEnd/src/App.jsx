import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './pages/Landing'
import WholeViewOfAssets from './pages/WholeViewOfAssets'


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Landing />,
      },]
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
