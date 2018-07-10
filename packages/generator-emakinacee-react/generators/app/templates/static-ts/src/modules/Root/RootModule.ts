import { Module } from 'cerebral';
import AppModule from '../App/AppModule';

/**
 * ROOT MODULE
 */
export default Module({
    state: {},
    signals: {},
    modules: {
        app: AppModule
    },
    providers: {},
    catch: []
});
