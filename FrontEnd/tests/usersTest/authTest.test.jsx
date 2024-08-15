import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, useOutletContext } from 'react-router-dom';
import { Login } from '../../src/components/AuthComponents/Login';
import {Logout} from '../../src/components/AuthComponents/Logout';
import { Register } from '../../src/components/AuthComponents/Register';
import { describe, it, vi } from 'vitest';

// Import the mock setup
import '@testing-library/jest-dom';

// Mock `react-router-dom` selectively
vi.mock('react-router-dom', async () => {
    const actualModule = await vi.importActual('react-router-dom');
    return {
        ...actualModule,
        useOutletContext: () => ({ updateLoginStatus: vi.fn() }),
    };
});

describe('Login component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
    });

    it('should render login form', () => {
        const form = screen.getByTestId('login-form');
        expect(form).toBeInTheDocument();
    });

    it('should render email input', () => {
        const emailInput = screen.getByTestId('email-input');
        expect(emailInput).toBeInTheDocument();
    });

    it('should render password input', () => {
        const passwordInput = screen.getByTestId('password-input');
        expect(passwordInput).toBeInTheDocument();
    });

    it('should update email input', async () => {
        const emailInput = screen.getByTestId('email-input');
        await userEvent.type(emailInput, 'a');
        expect(emailInput.value).toBe('a');
    });

    it('should update password input', async () => {
        const passwordInput = screen.getByTestId('password-input');
        await userEvent.type(passwordInput, 'a');
        expect(passwordInput.value).toBe('a');
    });

    it('should submit form', async () => {
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const form = screen.getByTestId('login-form');
        await userEvent.type(emailInput, 'a');
        await userEvent.type(passwordInput, 'a');
        await userEvent.click(form);
    });

});

// describe('Register component', () => {
