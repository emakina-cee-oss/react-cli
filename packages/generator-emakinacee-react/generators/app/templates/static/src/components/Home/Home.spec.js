import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@cerebral/react';
import controller from '../../controller';
import Home from './Home';

describe('Home', () => {

    it('renders without crashing', () => {
        ReactDOM.render(
            <Container controller={controller} >
                <Home />
            </Container>,
            document.createElement('div')
        );
    });
});
