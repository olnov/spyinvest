import { render } from '@testing-library/react';
import MyPortfolio from '../../src/pages/MyPortfolio';
import { describe, it, expect } from 'vitest';

describe('My Portfolio', () => {
    it('renders correctly', () => {
        render(<MyPortfolio />);
        expect(document.querySelector("h1").textContent).toBe('My Portfolio')
        expect(document.querySelector('.port-card__name1').textContent).toBe('Shares');
        expect(document.querySelector('.port-card__total-investment1').textContent).toBe('1000');
        expect(document.querySelector('.port-card__p-and-l1').textContent).toBe('200');
        expect(document.querySelector('.port-card__perc-p-and-l1').textContent).toBe('20%');
        expect(document.querySelector('.port-card__last-updated1').textContent).toBe('2021-09-01');
        expect(document.querySelector('button').textContent).toBe('Create Portfolio')
    })
})