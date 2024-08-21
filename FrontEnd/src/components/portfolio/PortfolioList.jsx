import React, { useState, useContext, useEffect } from 'react';
import { getMyAssets } from '../../services/portfolioAssetServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';
import CalculatedContext from '../../context/calculatedContext';

import Context from '../../context/Context';

const PortfolioList = () => {
  const { portfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("THIS IS THE CALCULATED" + CalculatedContext)

  const fetchPortfolioAssets = async () => {
    try {
      const data = await getMyAssets(localStorage.getItem('token'));
      setPortfolioAssetsState(data);
      console.log('Fetch Portfolio Assets data:', data);
    } catch (error) {
      console.error('Error fetching portfolio assets:', error);
    }
  };

  const fetchPortfolios = async () => {
    try {
      const data = await getPortfolios(localStorage.getItem('token'));

      setPortfolios(data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioAssets();
    fetchPortfolios();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!portfolios.length) {
    return <div>No portfolios available.</div>;
  }

  return (
    <div>
      <h1>Portfolios</h1>
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolioId={portfolio.id}
          portfolioName={portfolio.title}
          portfolioDescription={portfolio.description}
        // pAndL={/* calculate P&L here */}
        // percPAndL={/* calculate % P&L here */}
        // lastUpdated={formatLastUpdated(portfolio.lastUpdated)}
        />
      ))}
    </div>
  );
};

export default PortfolioList;
