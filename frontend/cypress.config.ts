import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:19006',
  },
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
});
