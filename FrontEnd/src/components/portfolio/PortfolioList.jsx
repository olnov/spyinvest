import React, { useState, useEffect } from 'react';
import { getMyAssets } from '../../services/portfolioAssetServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';
import Accordion from 'react-bootstrap/Accordion';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import './PortfolioList.scss';

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
      <Accordion>
      {portfolios.map((portfolio, index) => (
        <Accordion.Item eventKey={index.toString()} key={portfolio.id}>
          <Accordion.Header className="acc-header">
          <PortfolioCard
              key={portfolio.id}
              portfolioId={portfolio.id}
              portfolioName={portfolio.title}
              portfolioDescription={portfolio.description}
              
              totalInvestment={calculatePortfolioValue(portfolio.id)}
              // pAndL={/* calculate P&L here */}
              // percPAndL={/* calculate % P&L here */}
              // lastUpdated={/* format last updated date */}
              portfolioAssets={portfolioAssets}
              fetchPortfolioAssets={fetchPortfolioAssets}
              />
          </Accordion.Header>
          <Accordion.Body>
            {portfolioAssets.map((portfolioAsset) => {
              if (portfolioAsset.portfolio_id === portfolio.id) {
                return (
                  <AssetSummary
                  key={portfolioAsset.id}
                  assetName={portfolioAsset.asset_name}
                  assetSymbol={portfolioAsset.symbol}
                  datePurchased={portfolioAsset.date_purchased}
                  dateSell={portfolioAsset.date_sell}
                  quantity={portfolioAsset.quantity_purchase}
                  buyingPrice={portfolioAsset.price_buy}
                  sellingPrice={portfolioAsset.price_sell}
                  />
                );
              }
            })}
          </Accordion.Body>
          </Accordion.Item>
      ))}
      </Accordion>
    </div>
  );
};

export default PortfolioList;
