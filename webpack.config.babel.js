import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
    context: path.resolve(__dirname, './app'),
    entry: {
        app: path.resolve(__dirname, './src/main.js')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public'),
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            { 
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: 
                            {
                                minimize: true
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./styles/main.css', {
            allChunks: true
        }),
        new UglifyJSPlugin({
            beautify: false,
            sourceMap: true,
            compress: false,
            output: {
                comments: false
            }
        })
    ]
};