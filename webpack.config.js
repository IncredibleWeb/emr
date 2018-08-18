/* constants */
const isDev = process.env.NODE_ENV !== "production";
const isHttps = true;
const outputFolder = "dist";
const isDeploy = process.env.DEPLOY;

/* imports */
const packageJson = require("./package.json")
const path = require("path");
const webpack = require("webpack");
const NodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const node = {
    name: "node",
    devtool: isDev ? "eval" : "hidden-source-map",
    target: "node",
    node: {
        __dirname: true
    },
    externals: [NodeExternals()],
    entry: ["./app.babel.js"],
    output: {
        path: __dirname,
        filename: "app.js"
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            "process.env.isDev": JSON.stringify(isDev),
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.isHttps": JSON.stringify(isHttps),
            "process.env.outputFolder": JSON.stringify(outputFolder),
            "process.env.API_URL": JSON.stringify(process.env.API_URL),
            "process.env.API_PRIVATE_KEY": JSON.stringify(
                process.env.API_PRIVATE_KEY
            ),
            "process.env.API_TOKEN_DURATION": 20,
            "process.env.REQUIRE_AUTHENTICATION": false,
            "process.env.ALLOW_PUSH_NOTIFICATON": false,
            "process.env.STORAGE_URL": JSON.stringify(""),
            "process.env.SHOW_HEADER_LOGO": false,
            "process.env.NAME": JSON.stringify(packageJson.name),
            "process.env.DESCRIPTION": JSON.stringify(packageJson.description),
            "process.env.VERSION": JSON.stringify(packageJson.version),
            "process.env.AUTHOR.NAME": JSON.stringify(packageJson.author.name),
            "process.env.AUTHOR.EMAIL": JSON.stringify(packageJson.author.email),
            "process.env.AUTHOR.URL": JSON.stringify(packageJson.author.url)
        })
    ].concat(
        isDev
            ? []
            : [
                  new webpack.optimize.UglifyJsPlugin({
                      mangle: false,
                      sourceMap: false
                  })
              ]
    ),
    module: {
        loaders: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    fix: true,
                    emitWarning: true
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};

const web = {
    name: "web",
    devtool: isDev ? "eval" : "hidden-source-map",
    context: path.join(__dirname, "src"),
    externals: [
        {
            xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
        }
    ],
    entry: {
        "main.js": "./js/index.jsx",
        "style.css": "./scss/style.scss",
        "inline.css": "./scss/inline.scss",
        "vendor.css": "./scss/vendor.scss",
        vendor: [
            "axios",
            "react",
            "react-dom",
            "react-redux",
            "immutable",
            "react-router-dom",
            "react-transition-group",
            "react-helmet",
            "redux-immutable",
            "redux-thunk",
            "redux-form/immutable",
            "moment",
            "joi-browser"
        ]
    },
    output: {
        path: path.join(__dirname, outputFolder),
        filename: "[name]"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: 2
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.API_URL": JSON.stringify(process.env.API_URL),
            "process.env.API_TOKEN_DURATION": 20,
            "process.env.ALLOW_PUSH_NOTIFICATON": false,
            "process.env.STORAGE_URL": JSON.stringify(""),
            "process.env.SHOW_HEADER_LOGO": false,
            "process.env.NAME": JSON.stringify(packageJson.name),
            "process.env.DESCRIPTION": JSON.stringify(packageJson.description),
            "process.env.VERSION": JSON.stringify(packageJson.version),
            "process.env.AUTHOR.NAME": JSON.stringify(packageJson.author.name),
            "process.env.AUTHOR.EMAIL": JSON.stringify(packageJson.author.email),
            "process.env.AUTHOR.URL": JSON.stringify(packageJson.author.url)
        }),
        new CleanWebpackPlugin("./dist"),
        new ExtractTextPlugin({
            filename: `[name]`,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            {
                from: "./img/",
                to: "img/"
            },
            {
                from: "./favicon.ico",
                to: "./"
            },
            {
                from: "./manifest.json",
                to: "./"
            }
        ]),
        new StyleLintPlugin(),
        new SWPrecacheWebpackPlugin({
            cacheId: JSON.stringify(packageJson.name),
            filename: "sw.js",
            minify: isDev ? false : true,
            staticFileGlobs: [
                `${outputFolder}/**/*.css`,
                `${outputFolder}/**/*.js`,
                `${outputFolder}/img/*.{svg,png,jpg,gif,jpeg,webp}`,
                `${outputFolder}/img/icons/*.{svg,png,jpg,gif,jpeg,webp}`
              ],
            stripPrefix: `${outputFolder}`,
            maximumFileSizeToCacheInBytes: 8388608,
            dynamicUrlToDependencies: {'/':`${outputFolder}`}
        })
    ]
        .concat(isDev ? [] : [new webpack.optimize.UglifyJsPlugin()])
        .concat(isDeploy ? [] : [new BundleAnalyzerPlugin()]),
    module: {
        loaders: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    fix: true,
                    emitWarning: true
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "sass-loader"]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            },
            {
                test: /\.svg$/,
                loader:
                    "url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
            },
            {
                test: /\.woff$/,
                loader:
                    "url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {
                test: /\.woff2$/,
                loader:
                    "url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]"
            },
            {
                test: /\.[ot]tf$/,
                loader:
                    "url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
            },
            {
                test: /\.eot$/,
                loader:
                    "url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]"
            },
            {
                test: /\.modernizrrc.js$/,
                loader: "modernizr-loader"
            },
            {
                test: /\.modernizrrc(\.json)?$/,
                loader: "modernizr-loader!json-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            modernizr$: path.resolve(__dirname, "./.modernizrrc"),
            joi: "joi-browser"
        }
    }
};
module.exports = [node, web];
