const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = {
    raw: true,
    banner: 'require("source-map-support").install();'
  };
  const compress = {
    warnings: false
  };
  const compileTimeConstantForMinification = {
    __PRODUCTION__: JSON.stringify(production)
  };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        jquery: "jquery"
      })
    ];
  }
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress
      // }),
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        jquery: "jquery"
      })
    ];
  }
  if (production && browser) {
    return [
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new ExtractTextPlugin({
        filename: "[contenthash].css",
        allChunks: true
      }),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress
      // }),
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i
      }),
      new ManifestPlugin({
        fileName: "manifest.json"
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        jquery: "jquery"
      })
    ];
  }
  return [];
};
