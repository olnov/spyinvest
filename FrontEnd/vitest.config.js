import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        setupFiles: ['./tests/setupTests.js'], // Ensure the path is correct
        globals: true, // Ensure global variables are available
        environment: 'jsdom', // Use jsdom environment
    },
});
// 