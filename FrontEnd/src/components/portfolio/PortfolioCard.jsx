import React from 'react';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import AddAsset from '../PortfolioAssets/AddAsset';

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
  const modalId = `portfolioModal-${portfolioId}`;

  return (
    <div className="port-card">
      <div
        className="port-card__name"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
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
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${modalId}Label`}>
                {portfolioName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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

              {/* Add Asset Button */}
              <button
                className="btn btn-primary mt-3"
                data-bs-toggle="modal"
                data-bs-target={`#addAssetModal-${portfolioId}`}
                data-bs-dismiss="modal"
              >
                Add Asset
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AddAsset Component */}
      <AddAsset
        portfolioId={portfolioId}
        portfolioName={portfolioName}
        onSubmit={fetchPortfolioAssets}
      />
    </div>
  );
};

export default PortfolioCard;
