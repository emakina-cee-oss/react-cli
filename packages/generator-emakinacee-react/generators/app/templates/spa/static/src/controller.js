import {Controller} from 'cerebral';
import Devtools from 'cerebral/devtools';
import Router from '@cerebral/router';
import AppModule from './modules/App/AppModule';
import MinionsModule from './modules/Minions/MinionsModule';

const controller = Controller({
    devtools: process.env.NODE_ENV !== 'development' ? null : Devtools({
        remoteDebugger: 'localhost:8585',
        reconnect: true
    }),

    router: Router({
        routes: {
            '/': 'app.routed',
            '/minions': 'minions.routed'
        },

        // Merge query params into payload of signal
        query: false,

        // Only react to hash urls
        onlyHash: false,

        // Set a base url, if your app lives on a subpath
        baseUrl: null,

        // Will allow none matching routes on same origin to run as normal
        allowEscape: false,

        // Will make the router not run the initial route
        preventAutostart: false
    }),

    modules: {
        app: AppModule,
        minions: MinionsModule
    }
});

export default controller;
