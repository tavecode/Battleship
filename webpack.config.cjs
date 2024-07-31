const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    static: './dist',
    watchFiles: ["src/**/*"]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/index.html", to: "index.html" }]
    })
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  }
}
