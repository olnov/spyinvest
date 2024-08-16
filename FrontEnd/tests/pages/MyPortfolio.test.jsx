import { render } from '@testing-library/react';
import MyPortfolio from '../../src/pages/MyPortfolio';
import { describe, it, expect, vi } from 'vitest';

describe('My Portfolio', () => {
    it('renders correctly', async () => {
        render(<MyPortfolio />);
        expect(document.querySelector("h1").textContent).toBe('My Portfolio')
        expect(document.querySelector('button').textContent).toBe('Create Portfolio')
    })
    it('renders the modal correctly', async () => {
        render(<MyPortfolio />);
        const createButton = document.querySelector('button');
        createButton.click();
        const modal = document.querySelector('.modal');
        expect(modal).not.toBeNull();
    })
})