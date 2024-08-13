import React from "react";
import { useState } from "react";
import PortfolioCard from "./PortfolioCard";

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([{ id: 1, portfolioName: "Shares", totalInvestment: 1000, pAndL: 200, percPAndL: "20%", lastUpdated: "2021-09-01" }, { id: 2, portfolioName: "Stocks", totalInvestment: 2000, pAndL: 400, percPAndL: "20%", lastUpdated: "2021-09-01" }, { id: 3, portfolioName: "Commodities", totalInvestment: 3000, pAndL: 600, percPAndL: "20%", lastUpdated: "2021-09-01" }]); // JK: Added id to each portfolio object to ensure each div is unique when rendered for testing purposes, hardcoded for now 
  return (
    <>
      <div className="portfolios">
        {portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            id={portfolio.id}
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
