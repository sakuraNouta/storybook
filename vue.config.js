const path = require('path');
const { name } = require('./package');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin({
//   outputFormat: 'human'
// });

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8093; // dev port

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  // node_modules 下需要babel的文件写入
  transpileDependencies: [
    /[/\\]node_modules[/\\]vue-echarts[/\\]/,
    /[/\\]node_modules[/\\]resize-detector[/\\]/,
    /[/\\]node_modules[/\\]sys-user-access[/\\]/,
    /[/\\]node_modules[/\\]normalize-url[/\\]/,
    /[/\\]node_modules[/\\]prepend-http[/\\]/,
    /[/\\]node_modules[/\\]sort-keys[/\\]/,
    /[/\\]node_modules[/\\]element-ui[/\\]src[/\\]utils/,
    /[/\\]node_modules[/\\]@jiaminghi[/\\]data-view[/\\]lib/
  ],
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html']
      }),
      new LodashModuleReplacementPlugin()
    ]
  },
  chainWebpack: config => {
    if (process.env.IS_ANALYZE) {
      config
        .plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]);
    }
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch');
  }
};
