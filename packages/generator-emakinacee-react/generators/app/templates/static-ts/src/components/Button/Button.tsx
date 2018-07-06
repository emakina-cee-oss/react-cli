import React from 'react';
import styles from './Button.module.scss';

// eslint-disable-next-line
type ButtonProps = { label: string };

const Button: React.StatelessComponent<ButtonProps> = ({ label }: ButtonProps) => {
    return (
        <button className={styles.wrapper} type="button">
            {label}
        </button>
    );
};

export default Button;
