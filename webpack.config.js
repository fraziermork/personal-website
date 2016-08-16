const webpack       = require('webpack');
const autoprefixer  = require('autoprefixer');
const ExtractPlugin = require('extract-text-webpack-plugin');
const CleanPlugin   = require('clean-webpack-plugin');
const production    = process.env.NODE_ENV === 'production' || process.npm_lifecycle_event === 'build:production';

const PATHS         = {
  entry: `${__dirname}/app/entry`,
  build: `${__dirname}/build`
};

let plugins = [
  new ExtractPlugin('bundle.css'),
  new webpack.optimize.CommonsChunkPlugin({
    name:      'vendor',
    children:  true,
    minChunks: 2
  }),
  new webpack.optimize.OccurenceOrderPlugin(), 
  new CleanPlugin('build'),
  new webpack.DefinePlugin({
    __DEVONLY__: !production 
  })
];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]);
}

module.exports = {
  plugins,
  debug: !production, 
  entry: {
    vendor: [
      'angular', 
      'angular-ui-router'
    ], 
    bundle: [
      'bootstrap-loader/extractStyles',
      PATHS.entry
    ]
  }, 
  output: {
    path:     PATHS.build, 
    filename: '[name].js'
  }, 
  module: {
    preLoaders: [
      {
        // Automatically supply html templates as template to files ending in '-directive'
        test:   /(-directive|-state)\.js$/, 
        loader: 'baggage?[dir]-view.html=template'
      }, 
      {
        // Automatically require sass files named after directory to index files
        test:   /index\.js$/, 
        loader: 'baggage?[dir].scss'
      }
    ], 
    loaders: [
      {
        test:    /\.js$/, 
        loader:  'babel', 
        include: `${__dirname}/app`
      }, 
      {
        test:   /\.css$/, 
        loader: ExtractPlugin.extract('style', 'css!postcss', { allChunks: true })
      },
      {
        test:   /\.scss$/, 
        loader: ExtractPlugin.extract('style', 'css!postcss!resolve-url!sass?sourceMap', { allChunks: true })
      },
      {
        test:    /\.(png|jpe?g|ttf|eot|svg|woff(2)?)(\?v=\d+\.\d\.\d+)?$/, 
        loaders: [
          'url?limit=10000', 
          'image-webpack?bypassOnDebug'
        ]
      },
      {
        test:   /\.html$/, 
        loader: 'html'
      }
    ]
  }, 
  devSever: {
    devtool:            'eval-source-map', 
    contentBase:        PATHS.build, 
    historyApiFallback: true, 
    progress:           true, 
    stats:              'errors-only'
  }, 
  stats: {
    reasons:            true, 
    errorDetails:       true
  },
  postcss: function() {
    return [autoprefixer({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ]
    })];
  }
};
