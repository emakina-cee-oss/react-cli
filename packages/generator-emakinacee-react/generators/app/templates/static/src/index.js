import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@cerebral/react';
import App from './containers/App/App';
import controller from './controller';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

ReactDOM.render(
    <Container controller={controller} >
        <App />
    </Container>,
    document.getElementById('root')
);

registerServiceWorker();
