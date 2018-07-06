    /**
     * ESLint Rewire
     * Rewire react-scripts to use the .eslintrc file.
     */

    module.exports = (config) => {
        config.module.rules = config.module.rules.map((rule) => {
            if (String(rule.test) === String(/\.(js|jsx|mjs)$/) && rule.enforce === 'pre' && rule.use.length) {
                rule.test = /\.(js|jsx|mjs|ts|tsx)$/;
                rule.use[0].options = {
                    formatter: rule.use[0].options.formatter,
                };
            }
            return rule;
        });

        return config;
    };
