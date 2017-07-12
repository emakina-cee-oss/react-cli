import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral/react';
import App from './components/App/App';
import controller from './controller';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';


controller.getSignal('app.bootstrap')({});

ReactDOM.render(
    <Container controller={controller} >
        <App />
    </Container>,
    document.getElementById('root')
);

registerServiceWorker();
