import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from '@cerebral/react';
import styles from './Foo.module.scss';

const Foo = () => {
    return (
        <div className={styles.wrapper}>
            ...
        </div>
    );
};

Foo.propTypes = {};

export default Foo;

export const FooConnected = connect(
    {},
    Foo
);
