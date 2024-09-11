import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Context from "./context/Context";
import "./App.css";
import Landing from "./pages/Landing";
import MyPortfolio from "./pages/MyPortfolio";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sandbox } from "./pages/Sandbox/Sandbox";
import { NewsPage } from "./pages/NewsPage/NewsPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/portfolios",
    element: <MyPortfolio />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/sandbox",
    element: <Sandbox />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
]);
function App() {
  const [portfolioAssetsState, setPortfolioAssetsState] = useState([]);

  return (
    <>
      <Context.Provider
        value={{ portfolioAssetsState, setPortfolioAssetsState }}
      >
        <RouterProvider router={router} />
      </Context.Provider>
    </>
  );
}

export default App;
