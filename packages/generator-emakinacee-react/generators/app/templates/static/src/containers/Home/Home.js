import React from 'react';
import classNames from 'classnames';
import { connect } from '@cerebral/react';
import { state } from 'cerebral/tags';
import Button from '../../components/Button/Button';
import flexStyles from '../../styles/modules/flex.module.scss';
import containerStyles from '../../styles/modules/container.module.scss';

const Home = ({ title }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>To get started, edit <code>src/App.js</code> and save to reload.</p>

            <div
                className={classNames(
                    containerStyles.container,
                    flexStyles.flex,
                    flexStyles.flexJustifyBetween
                )}
            >
                <div>
                    <Button label="Foo" /> is so ...
                </div>
                <div>
                    ... damn flexible!
                </div>
            </div>
        </div>
    );
};

export default connect(
    {
        title: state`app.title`,
    },
    Home
);
