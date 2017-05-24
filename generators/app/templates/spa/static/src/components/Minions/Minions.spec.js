import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral/react';
import controller from '../../controller';
import Minions from './Minions';

it('renders without error', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Container controller={controller} >
            <Minions />
        </Container>,
        div
    );
});
