
module.exports = {
  paths: ['web/features/*.feature', 'web/features/**/*.feature'],
  requireModule: ['tsx/cjs'],
  require: ['web/tests/**/*.ts'],
  format: ['progress'],
  publish: false,
};
