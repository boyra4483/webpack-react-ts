import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.[contenthash].js",
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ title: "animan" })],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", "..."],
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  stats: {
    errorDetails: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
