/**
 * SASS Rewire
 * Rewire react-scripts to add support for SASS files.
 */
const { getLoader, loaderNameMatches } = require('react-app-rewired');

module.exports = (config, env) => {
    const sassExtension = [/\.scss$/, /\.sass$/];
    const moduleSassExtension = [/\.module\.scss$/, /\.module\.sass$/];

    const cssRulesProp = (env === 'production') ? 'loader' : 'use';

    const cssRules = getLoader(
        config.module.rules,
        rule => String(rule.test) === String(/\.css$/)
    );
    // cra will support cssModules in an upcoming version
    const moduleCssRulesFromConf = getLoader(
        config.module.rules,
        rule => String(rule.test) === String(/\.module\.css$/)
    );

    // currently css-modules are not supported -> create a deep cloneof the css-loader-rule
    const moduleCssRules = moduleCssRulesFromConf || JSON.parse(JSON.stringify(cssRules));

    const cssLoader = getLoader(cssRules[cssRulesProp], (rule) => {
        return loaderNameMatches(rule, 'css-loader');
    });

    const moduleCssLoader = getLoader(moduleCssRules[cssRulesProp], (rule) => {
        return loaderNameMatches(rule, 'css-loader');
    });

    cssLoader.options.importLoaders = moduleCssLoader.options.importLoader++; // increase preproccessing steps by 1 (sass-loader)
    cssLoader.options.sourceMap = moduleCssLoader.options.sourceMap = true;

    if (!moduleCssRulesFromConf) { // can be removed as soon as cra supports css-modules
        moduleCssLoader.options.modules = true;
        moduleCssLoader.options.localIdentName = '[path]__[name]___[local]'; // the same format as the upcoming cra-version
    }

    // ignore sassfiles in the fileLoader
    const fileLoader = getLoader(
        config.module.rules,
        rule => loaderNameMatches(rule, 'file-loader')
    );
    fileLoader.exclude.push(sassExtension);

    const getRules = () => {
        return [{
            test: sassExtension,
            exclude: moduleSassExtension,
            [cssRulesProp]: [
                ...cssRules[cssRulesProp],
                {
                    loader: require.resolve('sass-loader'),
                },
            ]
        }, {
            test: moduleSassExtension,
            [cssRulesProp]: [
                ...moduleCssRules[cssRulesProp],
                {
                    loader: require.resolve('sass-loader'),
                },
            ]
        }];
    };

    const oneOfRule = config.module.rules.find((rule) => rule.oneOf !== undefined);

    if (oneOfRule) {
        oneOfRule.oneOf = oneOfRule.oneOf.concat(getRules());
    }

    return config;
};
