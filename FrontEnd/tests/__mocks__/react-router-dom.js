import { vi } from 'vitest';

// Import original module to preserve other exports
const originalModule = vi.importActual('react-router-dom');

// Mock only the parts you need
const useOutletContext = vi.fn().mockReturnValue({
  updateLoginStatus: vi.fn(),
});

export const useNavigate = vi.fn();
export { useOutletContext };

// Re-export other parts of the original module
export * from 'react-router-dom';
