const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const optimization = () => {
  const config = {
      splitChunks: {
          chunks: 'all'
      }
  };
  if (isProd) {
    config.minimizer = [
        new OptimizeCssAssetsPlugin(),
        new TerserWebpackPlugin()
    ]
  }
  return config;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = addition => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader'
    ];
    if (addition) {
        loaders.push(addition);
    }
    return loaders;
};

const babelLoaders = preset => {
    const options = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    };
    if (preset) {
        options.presets.push(preset);
    }
    return options;
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelLoaders()
        }
    ];
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders;
};

const plugins = () => {
    const base =[
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ];
    if (isProd) {
        base.push(new BundleAnalyzerPlugin());
    }
    return base;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js', '.json', '.png'],
      alias: {
          '@models': path.resolve(__dirname, 'src/models'),
          '@':  path.resolve(__dirname, 'src')
      }
    },
    optimization: optimization(),
    devServer: {
      port: 4200,
      hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: babelLoaders('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: babelLoaders('@babel/preset-react')
                }
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
};
