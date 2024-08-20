import React, { useState, useContext, useEffect } from 'react';
import { getMyAssets } from '../../services/portfolioAssetServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';

import Context from '../../context/Context';

// Portfolio List - displays all portfolios and their assets - This is the heart of the application

const PortfolioList = () => {
  const { PortfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
  const [portfolios, setPortfolios] = useState([]);

  const fetchPortfolioAssets = async () => {
    const data = await getMyAssets(localStorage.getItem('token'));
    setPortfolioAssetsState(data);
  };

  const fetchPortfolios = async () => {
    const data = await getPortfolios(localStorage.getItem('token'));
    console.log('Fetch Portfolio data: ' + data);
    setPortfolios(data)
    
  };

  useEffect(() => {
    fetchPortfolioAssets();
    fetchPortfolios();
  }, []);

  // const calculatePortfolioValue = (portfolioId) => {
  //   let totalValue = 0;
  //   PortfolioAssetsState.forEach((portfolioAsset) => {
  //     if (portfolioAsset.portfolio_id === portfolioId) {
  //       totalValue += portfolioAsset.quantity_purchase * portfolioAsset.price_buy;
  //     }
  //   });
  //   return totalValue;
  // };

  return (
    <div>
      <h1>Portfolios</h1>
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolioId={portfolio.id}
          portfolioName={portfolio.title}
          portfolioDescription={portfolio.description}
          
          // totalInvestment={calculatePortfolioValue(portfolio.id)}
          // pAndL={/* calculate P&L here */}
          // percPAndL={/* calculate % P&L here */}
          // lastUpdated={/* format last updated date */}
         
        />
      ))}
    </div>
  );
};

export default PortfolioList;
