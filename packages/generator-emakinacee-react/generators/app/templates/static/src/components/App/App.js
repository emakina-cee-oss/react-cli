import React from 'react';
import Home from '../Home/Home';
import logo from './logo.svg';
import styles from './App.module.scss';

/**
 * APP
 *
 * @returns {XML} -
 */
const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <img src={logo} className={styles.logo} alt="logo" />
                <h2>Welcome to React</h2>
            </div>

            <Home />
        </div>
    );
};

export default App;
