/**
 * SASS Rewire
 * Rewire react-scripts to add support for SASS files.
 */

const { getLoader } = require('react-app-rewired');

module.exports = (config, env) => {
    const sassExtension = [/\.scss$/, /\.sass$/];
    const cssRules = getLoader(
        config.module.rules,
        rule => String(rule.test) === String(/\.css$/)
    );

    const getRule = () => {
        if (env === 'production') {
            return {
                test: sassExtension,
                loader: [
                    ...cssRules.loader,
                    {
                        loader: require.resolve('sass-loader'),
                    },
                ]
            };
        } else {
            return {
                test: sassExtension,
                use: [
                    ...cssRules.use,
                    {
                        loader: require.resolve('sass-loader'),
                    },
                ]
            };
        }
    };

    const oneOfRule = config.module.rules.find((rule) => rule.oneOf !== undefined);

    if (oneOfRule) {
        oneOfRule.oneOf.unshift(getRule());
    }

    return config;
};
