import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Context from './context/Context';

import './App.css'
import Landing from './pages/Landing'
import MyPortfolio from './pages/MyPortfolio';
import { useState } from 'react';
import CalculatedContext from './context/calculatedContext';

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
  const [portfolioAssetsState, setPortfolioAssetsState] = useState([]);
  const [calculatedAssets, setCalculatedAssets] = useState([[]]);

  

  return (

    <>
    <Context.Provider value={{ portfolioAssetsState, setPortfolioAssetsState}}>
      <CalculatedContext.Provider value={{ calculatedAssets, setCalculatedAssets}}>
    <RouterProvider router={router} />
    </CalculatedContext.Provider>
      </Context.Provider> 

      {/* <Context.Provider value={{ value:[portfolioAssetsState, setPortfolioAssetsState],
        value2: [calculatedAssets, setCalulclatedAssets]
      }}>
      <RouterProvider router={router} />
      </Context.Provider> */}

    </>
  )
}

export default App
