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
    getBabelLoader,
    getLoader,
    loaderNameMatches,
} = require('react-app-rewired');

function rewireBabelLoaderForDependencies(config, env) {
    const rulesProp = (env === 'production') ? 'loader' : 'use';
    const jsRules = getLoader(
        config.module.rules,
        rule => String(rule.test) === String(/\.js$/)
    );

    const babelLoaderForDependencies = getLoader(jsRules[rulesProp], (rule) => {
        return loaderNameMatches(rule, 'babel-loader');
    });

    babelLoaderForDependencies.options.presets = babelLoaderForDependencies.options.presets.concat([require.resolve('@babel/preset-stage-3')]);
    return config;
}

module.exports = {
    webpack: function (config, env) {
        config = rewireBabelLoaderForDependencies(config, env);
        config = rewireTypescript(config, env);
        return config;
    },
    jest: function (config) {
        return rewireTypescriptJest(config);
    },
};
