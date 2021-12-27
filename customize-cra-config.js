import { override, addLessLoader, fixBabelImports,overrideDevServer } from 'customize-cra';
import hotLoader from 'react-app-rewire-hot-loader';
import { theme } from './src/config/theme/themeVariables';

const supportMjs = () => webpackConfig => {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    loader: 'css-loader',
    options: {
      modules: true, // must add this
    },
    // devServer: {
    //   historyApiFallback: true,
    // },
    // type: 'javascript/auto',
  });
  // webpackConfig
  return webpackConfig;
};

module.exports = { webpack: override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...theme,
    },
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    modules: true,
    options: {
      modules: true, // must add this
    },
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?modules'],
  }),
  supportMjs(),
  (config, env) => {
    return hotLoader(config, env);
  },
),
devServer: overrideDevServer(
  // dev server plugin
  {historyApiFallback: true}
)
}