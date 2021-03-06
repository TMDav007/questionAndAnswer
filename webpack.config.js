const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './client/src/index.js',
    output: {
      path: path.resolve(__dirname, './client/build'),
      filename: '[name].js',
      publicPath:'/'
    },
    resolve: {
      extensions: ['.html','.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader','sass-loader']
            },
            {
              test: /\.(png|jpg|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                      limit: 8192 // in bytes
                  }
                }
              ]
            }
        ]
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "./client/public", "index.html")
        })
    ]
};