import React, { useState, useEffect } from 'react';
import { getMyAssets } from '../../services/portfolioAssetServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';

// Portfolio List - displays all portfolios and their assets - This is the heart of the application

const PortfolioList = () => {
  const [portfolioAssets, setPortfolioAssets] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

  const fetchPortfolioAssets = async () => {
    const data = await getMyAssets(localStorage.getItem('token'));
    setPortfolioAssets(data);
  };

  const fetchPortfolios = async () => {
    const data = await getPortfolios(localStorage.getItem('token'));
    setPortfolios(data)
    console.log('Fetch Portfolio data: ' + data);
  };

  useEffect(() => {
    fetchPortfolioAssets();
    fetchPortfolios();
  }, []);

  const calculatePortfolioValue = (portfolioId) => {
    let totalValue = 0;
    portfolioAssets.forEach((portfolioAsset) => {
      if (portfolioAsset.portfolio_id === portfolioId) {
        totalValue += portfolioAsset.quantity_purchase * portfolioAsset.price_buy;
      }
    });
    return totalValue;
  };

  return (
    <div>
      <h1>Portfolios</h1>
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolioId={portfolio.id}
          portfolioName={portfolio.name}
          portfolioDescription={portfolio.description}

          totalInvestment={calculatePortfolioValue(portfolio.id)}
          // pAndL={/* calculate P&L here */}
          // percPAndL={/* calculate % P&L here */}
          // lastUpdated={/* format last updated date */}
          portfolioAssets={portfolioAssets}
          fetchPortfolioAssets={fetchPortfolioAssets}
        />
      ))}
    </div>
  );
};

export default PortfolioList;
