import React from "react";
import { useState, useEffect } from "react";
import PortfolioCard from "./PortfolioCard";
import { getPortfolios } from "../../services/PortfoliosServices";

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);

  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getPortfolios(token);
      setPortfolios(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }
  , []);

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
