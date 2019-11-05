'use strict'

const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
// const vueLoaderConfig = require('./vue-loader.conf')
const Autoprefixer = require('autoprefixer')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const CssSplitWebpackPlugin = require('css-split-webpack-plugin')
const webpack = require('webpack')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: debug ? '/' : './',
    // baseUrl: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false, // 是否开启eslint保存检测，有效值：true | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ]
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            // .set('querystring', 'querystring-browser')
        config.entry.plugins = [
            new MinCssExtractPlugin({

            })
        ];
        config.entry.plugins = [
            new MinCssExtractPlugin({
                size: 4000
            })
        ];
        config.entry.app = ['babel-polyfill', 'eventsource-polyfill', './src/main.js'];
        config.entry.module = {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    option: {
                        postcss: [Autoprefixer({ overrideBrowserslist: ['last 10 Chrome versions', 'ie > 8'] })]
                    }
                }
            ]
        }
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 9527,
        index: 'index.html',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://192.168.1.91:8100/api',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
            // '/flow': {
            //     target: 'http://192.168.1.14:8789/flow',
            //     changeOrigin: true,
            //     pathRewrite: { '^/flow': '' }
            // },
            // '/out': {
            //     target: 'http://192.168.1.138:9090/out',
            //     changeOrigin: true,
            //     pathRewrite: { '^/out': '' }
            // },
            // '/ws': {
            //     target: 'ws://192.168.1.76:8899/',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: { '^/ws': '/' }
            // }
        }
    }
}
