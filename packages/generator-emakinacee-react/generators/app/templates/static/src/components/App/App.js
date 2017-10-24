import React from 'react';
import Home from '../Home/Home';
import logo from './logo.svg';
import './App.scss';

const App = () => {
    return (
        <div className="c-app">
            <div className="c-app__header">
                <img src={logo} className="c-app__logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>

            <Home />
        </div>
    );
};

export default App;
