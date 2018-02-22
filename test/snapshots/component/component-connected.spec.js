import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@cerebral/react';
import controller from '../../controller';
import Foo from './Foo';

describe('Foo', () => {

    it('renders without error', () => {
        ReactDOM.render(
            <Container controller={controller} >
                <Foo />
            </Container>,
            document.createElement('div')
        );
    });
});
