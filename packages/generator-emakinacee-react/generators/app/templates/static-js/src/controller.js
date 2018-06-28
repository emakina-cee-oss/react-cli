import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import RootModule from './modules/Root/RootModule';

const controller = Controller(RootModule, {
    devtools: process.env.NODE_ENV !== 'development' ? null : Devtools({
        host: 'localhost:8585',
        reconnect: true
    }),
});

export default controller;
