import React from 'react';
import ReactDOM from 'react-dom';
import Foo from './Foo';

describe('Foo', () => {

    it('renders without error', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Foo />, div);
    });
});
