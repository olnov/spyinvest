import React from 'react';
import { render } from '@testing-library/react';
import PortfolioList from '../../src/components/portfolio/PortfolioList';
import { describe, it, expect } from 'vitest';

describe('PortfolioList', () => {
    it ('renders Portfolio 1 correctly', () =>{
        render(<PortfolioList />);
        expect(document.querySelector('.port-card__name1').textContent).toBe('Shares');
        expect(document.querySelector('.port-card__total-investment1').textContent).toBe('1000');
        expect(document.querySelector('.port-card__p-and-l1').textContent).toBe('200');
        expect(document.querySelector('.port-card__perc-p-and-l1').textContent).toBe('20%');
        expect(document.querySelector('.port-card__last-updated1').textContent).toBe('2021-09-01');
    })

    it ('renders Portfolio 2 correctly', () =>{
        render(<PortfolioList />);
        expect(document.querySelector('.port-card__name2').textContent).toBe('Stocks');
        expect(document.querySelector('.port-card__total-investment2').textContent).toBe('2000');
        expect(document.querySelector('.port-card__p-and-l2').textContent).toBe('400');
        expect(document.querySelector('.port-card__perc-p-and-l2').textContent).toBe('20%');
        expect(document.querySelector('.port-card__last-updated2').textContent).toBe('2021-09-01');
    })

    it ('renders Portfolio 3 correctly', () =>{
        render(<PortfolioList />);
        expect(document.querySelector('.port-card__name3').textContent).toBe('Commodities');
        expect(document.querySelector('.port-card__total-investment3').textContent).toBe('3000');
        expect(document.querySelector('.port-card__p-and-l3').textContent).toBe('600');
        expect(document.querySelector('.port-card__perc-p-and-l3').textContent).toBe('20%');
        expect(document.querySelector('.port-card__last-updated3').textContent).toBe('2021-09-01');
    })
})