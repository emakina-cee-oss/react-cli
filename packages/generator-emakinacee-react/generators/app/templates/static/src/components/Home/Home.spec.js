import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@cerebral/react';
import controller from '../../controller';
import Home from './Home';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Container controller={controller} >
            <Home />
        </Container>,
        div
    );
});
