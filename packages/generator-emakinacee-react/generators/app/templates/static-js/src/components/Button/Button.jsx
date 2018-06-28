import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ label }) => {
    return (
        <button className={styles.wrapper} type="button">
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Button;
