const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const defaultsDeep = require("lodash/defaultsDeep");

module.exports = {
  entry: "/app/index.js", // Entry point of your application

  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), "build"),
      publicPath: "/",
    },
    {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
    }
  ), // Merge with env dependent settings
  optimization: {
    runtimeChunk: "single",
    minimize: false,
    splitChunks: {
      chunks: "all",
      minSize: 5000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 35,
      maxInitialRequests: 35,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/, // Rules for typescript only
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: "babel-loader", // Use babel-loader for transpilation
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/, // Rule for TypeScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: "ts-loader", // Use ts-loader for transpilation
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the 'dist' directory before each build
  ],
  resolve: {
    modules: ["node_modules", "/app"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".react.js"],
  },
};
