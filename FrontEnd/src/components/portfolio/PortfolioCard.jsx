import React from 'react'

const PortfolioCard = ({portfolioName, totalInvestment, pAndL, percPAndL, lastUpdated}) => {
  return (
    <div className="port-card">
        <div className="port-card__name">{portfolioName}</div>
        <div className="port-card__total-investment">{totalInvestment}</div>
        <div className="port-card__p-and-l">{pAndL}</div>
        <div className="port-card__perc-p-and-l">{percPAndL}</div>
        <div className="port-card__last-updated">{lastUpdated}</div>
    </div>
  )
}

export default PortfolioCard

// Portfolio Name - BE
// Total Investment - BE
// P&L - (Current Value - Total Investment) - BE
// %P&L - ((Current Value - Total Investment) / Total Investment) * 100 - BE
// Last Updated - BE