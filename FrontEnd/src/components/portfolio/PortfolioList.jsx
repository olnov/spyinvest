import { useState, useContext, useEffect } from 'react';
import { fetchAssetsandCurrentPrices } from '../../services/assetsServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';
import Accordion from 'react-bootstrap/Accordion';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import Dashboard from '../Dashboard/Dashboard'
import './PortfolioList.scss';


import Context from '../../context/Context';

const PortfolioList = () => {
  const { portfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioAssets = async () => {
    try {
      const data = await fetchAssetsandCurrentPrices(localStorage.getItem('token'));
      setPortfolioAssetsState(data);
      console.log('Fetch Portfolio Assets data:', portfolioAssetsState);
    } catch (error) {
      console.error('Error fetching portfolio assets:', error);
    }
  };

  const assets = portfolioAssetsState;
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
      <Dashboard assets={assets}/>
      <Accordion>
      {portfolios.map((portfolio, index) => (
        <Accordion.Item eventKey={index.toString()} key={portfolio.id}>
          <Accordion.Header className="acc-header">
          <PortfolioCard
              key={portfolio.id}
              portfolioId={portfolio.id}
              portfolioName={portfolio.title}
              portfolioDescription={portfolio.description}
              portfolioAssets={portfolioAssetsState.filter((portfolioAsset) => portfolioAsset.portfolio_id === portfolio.id)}
              fetchPortfolioAssets={fetchPortfolioAssets}
              />
          </Accordion.Header>
          <Accordion.Body>
            {portfolioAssetsState.map((portfolioAsset) => {
              if (portfolioAsset.portfolio_id === portfolio.id) {
                return (
                  <AssetSummary
                  key={portfolioAsset.id}
                  assetName={portfolioAsset.asset_name}
                  assetSymbol={portfolioAsset.symbol}
                  datePurchased={portfolioAsset.date_purchased}
                  dateSell={portfolioAsset.date_sell}
                  quantity={portfolioAsset.quantity_purchase}
                  qtysell={portfolioAsset.quantity_sell}
                  buyingPrice={portfolioAsset.price_buy}
                  sellingPrice={portfolioAsset.price_sell}
                  portAssetId={portfolioAsset.port_asset_id}
                  currentPrice = {portfolioAsset.currentPrice}
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
