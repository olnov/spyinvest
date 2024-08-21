import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Context from './context/Context';

import './App.css'
import Landing from './pages/Landing'
import MyPortfolio from './pages/MyPortfolio';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  }
])
function App() {
  const [portfolioAssetsState, setPortfolioAssetsState] = useState([]);
  const [calculatedAssets, setCalculatedAssets] = useState([]);



  return (

    <>
      <Context.Provider value={{ portfolioAssetsState, setPortfolioAssetsState }}>
          <RouterProvider router={router} />
        </Context.Provider>
    

   


    </>
  )
}

export default App
