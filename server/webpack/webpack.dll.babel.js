const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    vendor: [
      'react',
      'react-dom',
      // Add other vendor dependencies here as needed
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dll'), // Output directory for DLL bundle
    filename: '[name].dll.js', // Output DLL bundle filename
    library: '[name]_dll', // Name of the DLL bundle as a global variable
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll', // Name of the DLL bundle (must match the output.library option)
      path: path.resolve(__dirname, 'dll', '[name]-manifest.json'), // Output manifest file
    }),
  ],
};
