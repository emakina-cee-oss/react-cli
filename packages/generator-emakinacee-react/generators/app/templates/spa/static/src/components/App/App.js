import React from 'react';
import {connect} from 'cerebral/react';
import {state} from 'cerebral/tags';
import Home from '../Home/Home';
import Minions from '../Minions/Minions';
import logo from './logo.svg';
import './App.scss';

const VIEWS = {
    Home,
    Minions,
};

const App = ({loading, selectedView}) => {
    if (loading) return null;

    const CurrentView = VIEWS[selectedView];
    return (
        <div className="c-app">
            <div className="c-app__header">
                <img src={logo} className="c-app__logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <CurrentView />
        </div>
    );
};

export default connect({
    loading: state`app.$loading`,
    selectedView: state`app.$selectedView`
}, App);
