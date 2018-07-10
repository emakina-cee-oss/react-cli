const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (config, env) => {
    config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            async: false, // impacts performance, but otherwise react-scripts will clear the terminal 
            // and typechecing errors get swallowed
            watch: ['./src'] // optional but improves performance (less stat calls)
        })
    );
    return config;
};
