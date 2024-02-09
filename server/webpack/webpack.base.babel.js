const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: '/app/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/, // Rules for typescript only
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for transpilation
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"]
          },
        },
      },
      {
        test: /\.(ts|tsx)$/, // Rule for TypeScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: 'ts-loader', // Use ts-loader for transpilation
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the 'dist' directory before each build
  ],
  resolve: {
    modules: ['node_modules', '/app'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.react.js'],
  },
};
