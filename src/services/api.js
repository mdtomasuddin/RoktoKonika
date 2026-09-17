/**
 * Base API Configuration
 * Future Laravel REST API base URL.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Helper to simulate asynchronous network latency for realistic UX
export const simulateLatency = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));
