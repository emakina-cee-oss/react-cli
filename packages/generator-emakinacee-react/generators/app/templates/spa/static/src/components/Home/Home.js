import React from 'react';
import './Home.scss';

const Home = () => {
    return (
        <div className="c-home">
            <a href="/minions">Watch our minions</a>
            <p className="c-home__intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    );
};

export default Home;
