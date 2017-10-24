import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import AppModule from './modules/App/AppModule';

const controller = Controller({
    devtools: process.env.NODE_ENV !== 'development' ? null : Devtools({
        host: 'localhost:8585',
        reconnect: true
    }),

    modules: {
        app: AppModule,
    }
});

export default controller;
