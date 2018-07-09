import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@cerebral/react';
import App from './App';
import controller from '../../controller';

describe('App', () => {

    it('renders without crashing', () => {
        ReactDOM.render(
            <Container controller={controller} >
                <App />
            </Container>,
            document.createElement('div')
        );
    });
});
