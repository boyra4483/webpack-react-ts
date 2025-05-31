import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env) => {
  const isDevMode = env.mode === "development";

  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index-[contenthash].js",
      hashDigestLength: 10,
      clean: true,
    },
    plugins: [].concat(
      [new HtmlWebpackPlugin({ title: "animan" })],
      isDevMode
        ? []
        : new MiniCssExtractPlugin({ filename: "index-[contenthash].css" })
    ),
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
          test: /\.(scss|sass|css)$/i,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  namedExport: false,
                  exportLocalsConvention: "as-is",
                  localIdentHashDigestLength: 10,
                  localIdentName: `${
                    isDevMode
                      ? "[path][name]__[local]"
                      : "[local]__[hash:base64]"
                  }`,
                },
              },
            },
            "sass-loader",
          ],
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
};
