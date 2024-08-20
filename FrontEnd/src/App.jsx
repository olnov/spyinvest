import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Context from './context/Context';
import './App.css'
import Landing from './pages/Landing'

import { getMyAssets } from './services/portfolioAssetServices';

import MyPortfolio from './pages/MyPortfolio';
import { useState, useEffect } from 'react';

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
  const [PortfolioAssetsState, setPortfolioAssetsState] = useState([]);

  

  return (

    <>
      <Context.Provider value={{ PortfolioAssetsState, setPortfolioAssetsState }}>
      <RouterProvider router={router} />
      </Context.Provider>

    </>
  )
}

export default App
