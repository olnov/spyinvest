import React, { useState } from 'react';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import AddAsset from '../PortfolioAssets/AddAsset';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PortfolioCard = ({
  portfolioName,
  portfolioDescription,
  totalInvestment,
  pAndL,
  percPAndL,
  lastUpdated,
  portfolioId,
  portfolioAssets,
  fetchPortfolioAssets,
}) => {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showPotforlioModal, setShowPortfolioModal] = useState(false)

  const handleToggleAssetModal = () => {
    setShowAssetModal(!showAssetModal)
    setShowPortfolioModal(!showPotforlioModal)
  }

  return (
    <div className="port-card">
      <div
        className="port-card__name"
        // data-bs-toggle="modal"
        // data-bs-target={`#${modalId}`}
        onClick={() => setShowPortfolioModal(true)}
        style={{ cursor: 'pointer' }}
      >
        {portfolioName}
      </div>
      <div className="port-card__description">{portfolioDescription}</div>
      <div className="port-card__total-investment">${totalInvestment}</div>
      <div className="port-card__p-and-l">{pAndL}</div>
      <div className="port-card__perc-p-and-l">{percPAndL}</div>
      <div className="port-card__last-updated">{lastUpdated}</div>

      {/* Portfolio Modal */}
      <Modal show={showPotforlioModal} onHide={() => setShowPortfolioModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> {portfolioName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {portfolioAssets.map((portfolioAsset) => {
            if (portfolioAsset.portfolio_id === portfolioId) {
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
            return null;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleToggleAssetModal}>
            Add Asset
          </Button>
          <Button variant="secondary" onClick={handleToggleAssetModal}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      {/* AddAsset Component */}
      <AddAsset
        portfolioId={portfolioId}
        portfolioName={portfolioName}
        fetchPortfolioAssets={fetchPortfolioAssets}
        showAssetModal={showAssetModal}
        handleToggleAssetModal={handleToggleAssetModal}
      />
    </div>
  );
};

export default PortfolioCard;
