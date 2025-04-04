const path = require('path');

module.exports = {
    entry: './src/index.js', // Change this according to your entry file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Adjust output directory as needed
    },
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'), // Include the polyfill
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Make sure to install Babel if you're using ES6
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    devtool: 'source-map', // Optional: Helps in debugging
    mode: 'development', // Set to 'production' for production builds
};
