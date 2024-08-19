import React from 'react';
import { render, screen } from '@testing-library/react';
import CreatePortfolioForm from '../../../src/components/input/CreatePortfolioForm';
import { describe, it, expect, vi } from 'vitest';
import MyPortfolio from '../../../src/pages/MyPortfolio';

describe('CreatePortfolioForm', () => {
        render(<CreatePortfolioForm />);
        it('renders with input fields', () => {
            const nameInput = document.getElementById('title');
            const descriptionInput = document.getElementById('description');

            expect(nameInput).not.toBeNull();
            expect(descriptionInput).not.toBeNull();
        });
        it('renders with a button', () => {
            render(<CreatePortfolioForm />);
            const button = screen.getByTestId('button');
            expect(button).not.toBeNull();
        });
        it('reloads the page when the button is clicked', () => {
            const originalLocation = window.location;
            delete window.location;
            window.location = { ...originalLocation, reload: vi.fn() };
            render(<CreatePortfolioForm />);
            const button = screen.getByTestId('button');
            button.click();
            expect(window.location.reload).toHaveBeenCalled();
            window.location = originalLocation;
        });
})