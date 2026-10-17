
import type { IConfiguration } from '@cucumber/cucumber';

const config: Partial<IConfiguration> = {
  paths: ['web/features/**/*.feature'],
  requireModule: ['tsx/cjs'],
  require: ['web/tests/**/*.ts'],
  format: ['progress'],
  publish: false,
};

export default config;
