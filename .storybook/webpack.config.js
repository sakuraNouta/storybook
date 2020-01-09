const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  });
  Object.assign(config.resolve.alias, {
    '@': path.resolve(__dirname, '../src'),
    '@assets': path.resolve(__dirname, '../src/assets')
  });
  return config;
};
