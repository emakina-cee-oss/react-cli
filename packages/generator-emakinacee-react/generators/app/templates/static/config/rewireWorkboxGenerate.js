const { rewireWorkboxGenerate } = require('react-app-rewire-workbox');

module.exports = function override(config, env) {
    if (env !== "production") return config;

    /*
     * WORKBOX CONFIG
     * Add everything you need to the Workbox config here.
     * E.g. some runtime caching for API calls etc.
     *
     * Find more information about possible configurations on
     * https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#configuration
     *
     * In case you want to use your own service-worker file and just
     * inject the files from the webpack pipeline to the pre caching
     * you can use the InjectManifest plugin instead of the GenerateSW
     * plugin.
     * Find more information on that in the README.
     */
    const workboxConfig = {};

    config = rewireWorkboxGenerate(workboxConfig)(config, env);
    return config;
};
