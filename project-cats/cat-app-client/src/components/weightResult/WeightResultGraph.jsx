import React from 'react';
import styles from '../../styles/WeightResultGraph.module.css';

import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    Area,
    ResponsiveContainer,
} from 'recharts';
import { useEffect } from 'react';
import axios from 'axios';

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
];

export default function WeightResultGraph() {
    //나중에 백엔드 연동해서 이렇게 최근순으로 당겨오면됌
    const perDay = data.slice(-7);
    const comaparisonResult =
        data[data.length - 1].wgt - data[data.length - 2].wgt;
    const Result = Math.floor(comaparisonResult);

    const perDayHandler = () => {
        // axios.get('<주소>').then((res) => {
        //     const data = res.data.map((data) => {
        //         return {
        //               //코드 작성
        //         };
        //     });
        // });
        data.map((data) => {
            return {
                //나중에 백엔드 연동해서 이렇게 최근 요일순으로 당겨오면됌
                // const perDay = data.slice(-7);
                XAxis: data.name,
            };
        });
        console.log('일마다', XAxis);
    };
    const perMonthHandler = () => {
        // axios.get('<주소>').then((res) => {
        //     const data = res.data.map((data) => {
        //         return {
        //             XAxis: data.name,
        //             YAxis: data.name,
        //나중에 백엔드 연동해서 이렇게 최근 월별순으로 당겨오면됌
        //그리고 나서 data의 값을 바꾸면 됌
        //
        //         };
        //     });
        // });
        console.log('매달');
    };
    useEffect(() => {
        // const data = axios.get('<주소> ');
        // console.log(test);
        // console.log(data.length - 3);
    });

    return (
        <div className={styles.graph__container}>
            <div style={{ width: '90%', height: 400, maxWidth: 1200 }}>
                <ResponsiveContainer>
                    <ComposedChart
                        width={1000}
                        height={400}
                        data={perDay}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis type="number" dataKey="wgt" unit="kg" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="wgt"
                            fill="#f2cc8f"
                            stroke="#f2cc8f"
                        />
                        <Line type="monotone" dataKey="wgt" stroke="#ff7300">
                            <LabelList dataKey="wgt" position="top" />
                        </Line>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.select__wrapper}>
                <button onClick={perDayHandler}>일별</button>
                <button onClick={perMonthHandler}>월별</button>
            </div>
            <div>
                <div className={styles.weight__wrapper}>
                    <h2>오늘 몸무게</h2>
                    <ul>
                        <li>{data[data.length - 1].name}</li>
                        <li>{data[data.length - 1].wgt}KG</li>
                    </ul>
                </div>
                <div className={styles.weight__wrapper}>
                    <h2>이전 몸무게</h2>
                    <ul>
                        <li>{data[data.length - 2].name}</li>
                        <li>{data[data.length - 2].wgt}KG</li>
                    </ul>
                </div>
                <div className={styles.result__wrapper}>
                    <p>몸무게 변화</p>
                    <p>{Result < 0 ? `${Result}` : `+ ${Result}`} kg</p>
                </div>
            </div>
        </div>
    );
}
