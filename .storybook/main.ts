import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '@/components': path.resolve(__dirname, '../src/components'),
        '@/pages': path.resolve(__dirname, '../src/pages'),
        '@/hooks': path.resolve(__dirname, '../src/hooks'),
        '@/lib': path.resolve(__dirname, '../src/lib'),
        '@/types': path.resolve(__dirname, '../src/types'),
        '@/styles': path.resolve(__dirname, '../src/styles'),
        '@/assets': path.resolve(__dirname, '../src/assets'),
        '@/i18n': path.resolve(__dirname, '../src/i18n'),
      };
    }
    return config;
  },
};

export default config;
