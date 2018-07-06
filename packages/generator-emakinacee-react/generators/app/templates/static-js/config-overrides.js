/**
 * Rewire the create react app.
 *
 * You can change the webpack configuration of the react scripts here:
 * 1. create a rewire script in ./config
 * 2. import and add the script to the compose function below.
 *
 * For more information and details see https://github.com/timarney/react-app-rewired
 */

const { compose } = require('react-app-rewired');
const rewireESLint = require('./config/rewireESLint');
const rewireWorkboxGenerate = require('./config/rewireWorkboxGenerate');
const rewireBabelLoaderToUseBabelRC = require('./config/rewireBabelLoaderToUseBabelRC');
const rewireBabelLoaderForDependencies = require('./config/rewireBabelLoaderForDependencies');


module.exports = function override(config, env) {
    const rewires = compose(
        rewireESLint,
        rewireWorkboxGenerate,
        rewireBabelLoaderForDependencies
    );

    return rewires(config, env);
};
