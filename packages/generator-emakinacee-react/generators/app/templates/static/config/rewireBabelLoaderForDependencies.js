const {
    getLoader,
    loaderNameMatches,
} = require('react-app-rewired');

module.exports = (config, env) => {
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
