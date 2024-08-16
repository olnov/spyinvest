import React from 'react';
import { render } from '@testing-library/react';
import PortfolioCard from '../../../src/components/portfolio/PortfolioCard';
import { describe, it, expect } from 'vitest';

describe('PortfolioCard', () => {
    it ('renders correctly', () =>{
        render(<PortfolioCard id="1" portfolioName="Portfolio 1" totalInvestment="1000" pAndL="200" percPAndL="20%" lastUpdated="2021-09-01" />);
        expect(document.querySelector('.port-card__name1').textContent).toBe('Portfolio 1');
        expect(document.querySelector('.port-card__total-investment1').textContent).toBe('1000');
        expect(document.querySelector('.port-card__p-and-l1').textContent).toBe('200');
        expect(document.querySelector('.port-card__perc-p-and-l1').textContent).toBe('20%');
        expect(document.querySelector('.port-card__last-updated1').textContent).toBe('2021-09-01');
    })
})