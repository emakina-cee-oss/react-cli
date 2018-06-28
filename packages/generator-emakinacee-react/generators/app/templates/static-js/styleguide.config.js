// STYLEGUIDE CONFIG
//
// This configures Styleguidist to use the react-app-rewired modifications
// instead of the regular create-react-app webpack config.
//
// https://github.com/timarney/react-app-rewired/blob/master/packages/react-app-rewired/examples/react-styleguidist.md

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const paths = require('react-app-rewired/scripts/utils/paths');
require(paths.scriptVersion + '/config/env');

const webpackConfig = (process.env.NODE_ENV === 'production')
    ? paths.scriptVersion + '/config/webpack.config.prod'
    : paths.scriptVersion + '/config/webpack.config.dev';

const config = require(webpackConfig);
const override = require(paths.configOverrides);
const overrideFn =
    typeof override === 'function'
        ? override
        : override.webpack || ((config, env) => config);

module.exports = {
    webpackConfig: overrideFn(config, process.env.NODE_ENV),
};
