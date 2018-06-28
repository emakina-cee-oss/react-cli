/**
 * Rewire the create react app.
 *
 * You can change the webpack configuration of the react scripts here:
 *
 * For more information and details see https://github.com/timarney/react-app-rewired
 */
const {
    rewireWebpack: rewireTypescript,
    rewireJest: rewireTypescriptJest,
} = require('react-app-rewire-typescript-babel-preset');


///////

const path = require("path");
const fs = require("fs");

const rewireBabelLoader = require('react-app-rewire-babel-loader');


// helpers

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
//////

module.exports = {
    webpack: function(config, env) {
        config = rewireTypescript(config, env);

        // white-list some npm modules to the babel-loader pipeline
        // see: https://webpack.js.org/configuration/module/#rule-include

        config = rewireBabelLoader.include(
            config,
            resolveApp('node_modules/react-styleguidist')
        );

        // black-list some modules from the babel-loader pipeline
        // see: https://webpack.js.org/configuration/module/#rule-exclude
        config = rewireBabelLoader.exclude(
            config,
            /(node_modules|bower_components)/
        );

        return config;
    },
    jest: function(config) {
        return rewireTypescriptJest(config);
    },
};