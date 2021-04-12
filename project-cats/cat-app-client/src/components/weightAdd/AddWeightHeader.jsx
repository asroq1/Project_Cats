import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/AddWeightHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const AddWeightHeader = () => {
    return (
        <header>
            <div className={styles.header}>
                <Link to="/">
                    <img
                        src="/image/default.png"
                        alt="logo"
                        className={styles.logo}
                    />
                </Link>
                <h2>체중 측정하기</h2>
                <span className={styles.exit__btn}>
                    <Link to="/user/main">
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={styles.icon}
                        />
                    </Link>
                </span>
            </div>
        </header>
    );
};

export default AddWeightHeader;
