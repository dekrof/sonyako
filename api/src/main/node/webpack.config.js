const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env) => {
    const dotenv = new Dotenv({
        path: path.resolve(__dirname, ".env"),
        safe: true,
        allowEmptyValues: true,
        systemvars: false,
        silent: true,
        defaults: false
    });

    const environment = Object.keys(dotenv.definitions).reduce((prev, next) => {
        prev[next] = JSON.parse(dotenv.definitions[next]);
        return prev;
    }, {});

    environment["process.env.development"] = !!(env && !env.production);

    return {
        entry: "./com/makeit/web/index.tsx",
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                "@translation": path.resolve(__dirname, "./com/makeit/web/translation/"),
                "@component": path.resolve(__dirname, "./com/makeit/web/component/"),
                "@client": path.resolve(__dirname, "./com/makeit/web/client/"),
                "@model": path.resolve(__dirname, "./com/makeit/web/model/"),
                "@page": path.resolve(__dirname, "./com/makeit/web/page/"),
                "@css": path.resolve(__dirname, "./com/makeit/web/asset/css/"),
                "@svg": path.resolve(__dirname, "./com/makeit/web/asset/svg/"),
                "@png": path.resolve(__dirname, "./com/makeit/web/asset/png/"),
            }
        },
        output: {
            path: path.join(__dirname, "../../../target/classes/public/web"),
            filename: "build.js"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true
                    },
                    exclude: /dist/,
                },
                {
                    test: /\.svg$/,
                    issuer: {
                        test: /\.(t|j)sx?$/
                    },
                    use: ["@svgr/webpack"],
                },
                {
                    test: /\.svg$/,
                    issuer: {
                        test: /\.less?$/
                    },
                    loader: "url-loader?limit=10000&mimetype=image/svg+xml"
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true,
                                },
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        "file-loader",
                    ],
                },
                {
                    test: /\.json$/,
                    loader: "json-loader"
                },
            ]
        },
        devServer: {
            historyApiFallback: true,
            compress: true,
            port: 9090,
            publicPath: "/",
            proxy: {
                "/api": {
                    target: "http://localhost:8080",
                    secure: false,
                    prependPath: false
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html"
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: true
            }),
            new webpack.DefinePlugin(environment),
        ]
    }
};
