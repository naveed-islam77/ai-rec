/**
 * Vitest Configuration Example
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to your project root
 * 2. Rename it to "vitest.config.ts"
 * 3. Adjust paths and settings as needed for your environment
 * 
 * This file cannot be used in Figma Make environment.
 * Use it when you export this code to your own development setup.
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom for DOM testing
    environment: 'jsdom',
    
    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,
    
    // Setup file for test configuration
    setupFiles: './tests/setup.ts',
    
    // Enable CSS processing in tests
    css: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/**',
        'dist/',
        'build/',
        '.next/',
        'components/ui/**', // Exclude UI library components
        'components/figma/**', // Exclude Figma-specific components
      ],
      // Coverage thresholds (tests will fail if not met)
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
    
    // Test timeout (milliseconds)
    testTimeout: 10000,
    
    // Reporters for test output
    reporters: ['verbose'],
    
    // Include/exclude patterns
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      '**/node_modules/**',
    ],
    
    // Watch mode options
    watch: false,
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@utils': path.resolve(__dirname, './utils'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
});
