import React from 'react'

const PortfolioCard = ({id, portfolioName, totalInvestment, pAndL, percPAndL, lastUpdated}) => {
  return (
    <div className="port-card">
        <div className={"port-card__name" + id}>{portfolioName}</div> {/* JK: Added id to class name to ensure each div is unique when rendered for testing purposes */}
        <div className={"port-card__total-investment" + id}>{totalInvestment}</div>
        <div className={"port-card__p-and-l" + id}>{pAndL}</div>
        <div className={"port-card__perc-p-and-l" + id}>{percPAndL}</div>
        <div className={"port-card__last-updated" + id}>{lastUpdated}</div>
    </div>
  )
}

export default PortfolioCard

// Portfolio Name - BE
// Total Investment - BE
// P&L - (Current Value - Total Investment) - BE
// %P&L - ((Current Value - Total Investment) / Total Investment) * 100 - BE
// Last Updated - BE