import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@cerebral/react';
import App from './containers/App/App';
import controller from './controller';
import registerServiceWorker from './registerServiceWorker';
import './styles/global.scss';

ReactDOM.render(
    <Container controller={controller} >
        <App />
    </Container>,
    document.getElementById('root')
);

registerServiceWorker();
