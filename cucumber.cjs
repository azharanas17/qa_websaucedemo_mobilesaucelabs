module.exports = {
  default: {
    paths: ['web/features/**/*.feature'],
    requireModule: ['tsx/cjs'],
    require: ['web/tests/**/*.ts'],
    publish: false,
  },
  login: {
    paths: ['web/features/login.feature'],
    requireModule: ['tsx/cjs'],
    require: ['web/tests/**/*.ts'],
    publish: false,
  },
};
