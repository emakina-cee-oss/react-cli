import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Foo.module.scss';

class Foo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className={styles.wrapper}>
                ...
            </div>
        );
    }
}

Foo.propTypes = {};

export default Foo;
