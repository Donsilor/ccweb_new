const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { legacy: true }], config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1da02b', '@layout-header-background': '#0b3333;' },
    javascriptEnabled: true,
  })(config, env);
  config.externals = {
    BMap: 'BMap',
  };
  // console.error(config);
  // process.exit(0);

  return config;
};
