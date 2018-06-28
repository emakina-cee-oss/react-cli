import React from 'react';
import styles from './Button.module.scss';


const Button = ({ label }) => {
    return (
        <button className={styles.wrapper} type="button">
            {label}
        </button>
    );
};

export default Button;
