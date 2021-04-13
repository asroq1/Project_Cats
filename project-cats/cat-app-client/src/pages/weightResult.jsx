import React from 'react';
import { useState } from 'react';
import WeightResultGraph from '../components/weightResult/WeightResultGraph';
import WeightResultList from '../components/weightResult/WeightResultList';
import styles from '../styles/weightResult.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartBar,
    faListAlt,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const WeightResult = () => {
    const [onList, setOnList] = useState(false);
    const chartHandler = () => {
        setOnList(false);
    };
    const listHandler = () => {
        setOnList(true);
    };
    return (
        <>
            <header className={styles.header}>
                {/* <button onClick={chartHandler}>그래프</button>
                <button onClick={listHandler}>리스트</button> */}
                <FontAwesomeIcon onClick={chartHandler} icon={faChartBar} />
                <FontAwesomeIcon onClick={listHandler} icon={faListAlt} />
                <Link to="/user/main">
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className={styles.icon}
                    />
                </Link>
            </header>
            {!onList && <WeightResultGraph />}
            {onList && <WeightResultList />}
        </>
    );
};

export default WeightResult;
