import React from 'react';
import { connect } from '@cerebral/react';
import { state } from 'cerebral/tags';
import './Home.scss';

const Home = ({ title }) => {
    return (
        <div className="c-home">
            <h1>{title}</h1>
            <p className="c-home__intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    );
};

export default connect(
    {
        title: state`app.title`,
    },
    Home
);
