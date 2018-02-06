import React from 'react';
import { connect } from '@cerebral/react';
import { state } from 'cerebral/tags';
import Button from '../../components/Button/Button';
import styles from './Home.module.scss';

const Home = ({ title }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p className={styles.intro}>
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <Button label="Foo" />
        </div>
    );
};

export default connect(
    {
        title: state`app.title`,
    },
    Home
);
