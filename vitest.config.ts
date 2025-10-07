/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      exclude: [
        '**/index.ts', // Index files
        '**/*.config.ts', // Configuration files
        '**/*.d.ts', // Type definitions
        'dist/**', // Distribution files
        'src/data/**', // Data files
        'src/enums/**', // Enumerations
      ],
    },
  },
});
