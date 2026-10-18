module.exports = {
  default: {
    paths: ['mobile/features/**/*.feature'],
    requireModule: ['tsx/cjs'],
    require: ['mobile/tests/**/*.ts'],
    format: [
      'progress',
      ['json', 'reports/cucumber-mobile-report.json'],
      ['allure-cucumberjs/reporter'],
    ],
    formatOptions: {
      resultsDir: 'allure-results-mobile',
    },
    publish: false,
    timeout: 60000,
  },
  login: {
    paths: ['mobile/features/login.feature'],
    requireModule: ['tsx/cjs'],
    require: ['mobile/tests/**/*.ts'],
    format: [
      'progress',
      ['json', 'reports/cucumber-mobile-report.json'],
      ['allure-cucumberjs/reporter'],
    ],
    formatOptions: {
      resultsDir: 'allure-results-mobile',
    },
    publish: false,
    timeout: 60000,
  },
};
