module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'out/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    externals: {
      'jquery': 'jQuery',
    }
};
