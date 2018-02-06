import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

describe('Button', () => {

    it('renders without error', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button />, div);
    });
});
