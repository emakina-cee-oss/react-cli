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

const {
    getLoader,
    loaderNameMatches,
} = require('react-app-rewired');

const rewireESLint = require('./config/rewireESLint');
const rewireWorkboxGenerate = require('./config/rewireWorkboxGenerate');
const rewireTSCheckerPlugin = require('./config/rewireTSCheckerPlugin');

module.exports = {
    webpack: function (config, env) {
        config = rewireTypescript(config, env);
        config = rewireTSCheckerPlugin(config, env);
        config = rewireESLint(config);
        config = rewireWorkboxGenerate(config, env);
        return config;
    },
    jest: function (config) {
        return rewireTypescriptJest(config);
    },
};
