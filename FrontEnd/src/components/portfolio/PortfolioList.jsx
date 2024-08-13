import React from "react";
import { useState } from "react";
import PortfolioCard from "./PortfolioCard";

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([{ id: 1, portfolioName: "Portfolio 1", totalInvestment: 1000, pAndL: 200, percPAndL: "20%", lastUpdated: "2021-09-01" }, { id: 2, portfolioName: "Portfolio 2", totalInvestment: 2000, pAndL: 400, percPAndL: "20%", lastUpdated: "2021-09-01" }, { id: 3, portfolioName: "Portfolio 3", totalInvestment: 3000, pAndL: 600, percPAndL: "20%", lastUpdated: "2021-09-01" }]); // Hardcoded for now
  return (
    <>
      <div className="portfolios">
        {portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            portfolioName={portfolio.portfolioName}
            totalInvestment={portfolio.totalInvestment}
            pAndL={portfolio.pAndL}
            percPAndL={portfolio.percPAndL}
            lastUpdated={portfolio.lastUpdated}
          />
        ))}
      </div>
    </>
  );
};

export default PortfolioList;
