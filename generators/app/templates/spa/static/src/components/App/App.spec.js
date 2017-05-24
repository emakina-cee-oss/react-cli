import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral/react';
import controller from '../../controller';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Container controller={controller} >
            <App />
        </Container>,
        div
    );
});
