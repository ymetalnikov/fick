
module.exports = {
    context: __dirname + '/src',
    entry: './index.js',
    output: {
        path: __dirname + '/public/assets',
        publicPath: '/assets/',
        filename: 'app.js'
    },
    watch: true,
    devtool:  'eval',
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env', 'react', 'stage-0']
                }
            }
        ]
    }
};