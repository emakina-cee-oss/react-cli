import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="c-app">
                <div className="c-app__header">
                    <img src={logo} className="c-app__logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="c-app__intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
