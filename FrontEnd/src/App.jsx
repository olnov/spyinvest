import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PortfolioCard from './components/portfolio/PortfolioCard'
import PortfolioList from './components/portfolio/PortfolioList'
import MyPortfolio from './pages/MyPortfolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* JK: <div className="portfolios"> Added portfolio div to test props coming through. Hardcoded for now */}
      {/* < PortfolioCard portfolioName="Portfolio 1" totalInvestment="1000" pAndL="200" percPAndL="20%" lastUpdated="2021-09-01" />
      </div> */}
      <div className="portfolios"> {/* JK: Added div to render PortfolioList, will be moved to a page when appropriate */}
        <MyPortfolio />
      </div>
    </>
  )
}

export default App
