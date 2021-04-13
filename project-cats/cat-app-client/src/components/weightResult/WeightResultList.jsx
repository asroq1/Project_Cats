import axios from 'axios';
import React, { useEffect } from 'react';
import styles from '../../styles/WeightResultList.module.css';
const data = [
    {
        name: '2020-08-02',
        wgt: 22.2,
    },
    {
        name: '2020-08-03',
        wgt: 22.4,
    },
    {
        name: '2020-09-12',
        wgt: 25.2,
    },
    {
        name: '2020-09-22',
        wgt: 25.0,
    },
    {
        name: '2020-10-22',
        wgt: 28.2,
    },
    {
        name: '2020-12-22',
        wgt: 30.2,
    },
    {
        name: '2020-12-30',
        wgt: 22.2,
    },
    {
        name: '2020-01-30',
        wgt: 25.2,
    },
    {
        name: '2020-03-30',
        wgt: 29.2,
    },
    {
        name: '2020-04-20',
        wgt: 29.2,
    },
    {
        name: '2020-05-12',
        wgt: 29.2,
    },
];
const WeightResultTable = () => {
    // 연동하면 여기에서 바로 조회하면 끝
    // const test = axios.get('</백엔드 주소>');
    return (
        <div className={styles.list__container}>
            {data.map((data) => {
                return (
                    <div className={styles.list__wrapper} key={data.name}>
                        <p>{data.name}</p>
                        <p>{data.wgt}kg</p>
                    </div>
                );
            })}
        </div>
    );
};

export default WeightResultTable;
